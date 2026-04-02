class o {
  constructor(e, t) {
    this.items = [], this.readIndex = 0, this.charCursor = 0, this.currentSegmentText = "", this.currentAgentId = null, this._paused = !1, this._disposed = !1, this.timer = null, this._dwellTicksRemaining = 0, this._holdingForTTS = !1, this._holdSegmentSnapshot = -1, this.partCounter = 0, this._drainResolve = null, this._drainReject = null, this.cb = e, this.tickMs = (t == null ? void 0 : t.tickMs) ?? 30, this.charsPerTick = (t == null ? void 0 : t.charsPerTick) ?? 1, this.postTextDelayTicks = Math.ceil(((t == null ? void 0 : t.postTextDelayMs) ?? 0) / this.tickMs), this.actionDelayTicks = Math.ceil(((t == null ? void 0 : t.actionDelayMs) ?? 0) / this.tickMs);
  }
  // ─── Push Methods ────────────────────────────────────────────────
  pushAgentStart(e) {
    this._disposed || (this.sealLastText(), this.items.push({ kind: "agent_start", ...e }));
  }
  pushAgentEnd(e) {
    this._disposed || (this.sealLastText(), this.items.push({ kind: "agent_end", ...e }));
  }
  /**
   * Append text for a message.
   * If the last queue item is an unsealed text item for the same messageId,
   * the delta is appended in-place. Otherwise a new text item is created.
   */
  pushText(e, t, i) {
    if (this._disposed) return;
    const s = this.items[this.items.length - 1];
    s && s.kind === "text" && s.messageId === e && !s.sealed ? s.text += t : this.items.push({
      kind: "text",
      messageId: e,
      agentId: i ?? this.currentAgentId ?? "",
      partId: `p${this.partCounter++}`,
      text: t,
      sealed: !1
    });
  }
  /** Mark the current (last) text item as complete — no more appends expected. */
  sealText(e) {
    if (!this._disposed)
      for (let t = this.items.length - 1; t >= 0; t--) {
        const i = this.items[t];
        if (i.kind === "text" && i.messageId === e && !i.sealed) {
          i.sealed = !0;
          break;
        }
      }
  }
  pushAction(e) {
    this._disposed || (this.sealLastText(), this.items.push({ kind: "action", ...e }));
  }
  pushThinking(e) {
    this._disposed || this.items.push({ kind: "thinking", ...e });
  }
  pushCueUser(e) {
    this._disposed || this.items.push({ kind: "cue_user", ...e });
  }
  pushDone(e) {
    this._disposed || (this.sealLastText(), this.items.push({ kind: "done", ...e }));
  }
  pushError(e) {
    this._disposed || this.items.push({ kind: "error", message: e });
  }
  // ─── Control ─────────────────────────────────────────────────────
  /** Start the tick loop. Idempotent — calling twice is safe. */
  start() {
    this._disposed || this.timer || (this.timer = setInterval(() => this.tick(), this.tickMs));
  }
  /** Instantly pause — tick becomes a no-op. */
  pause() {
    this._paused = !0;
  }
  /** Resume from exactly where we left off. */
  resume() {
    this._paused = !1;
  }
  /**
   * Returns a Promise that resolves when the buffer has processed all items
   * including the final `done` item. Rejects if the buffer is disposed/shutdown
   * before draining completes.
   *
   * NOTE: This will block indefinitely while the buffer is paused, by design.
   * Buffer-level pause (see `livePausedRef` in use-chat-sessions) freezes ALL
   * forward progress — the tick loop is a no-op while `_paused` is true, so
   * no items are processed and drain never fires until resumed.
   */
  waitUntilDrained() {
    return this._disposed ? Promise.reject(new Error("Buffer already disposed")) : new Promise((e, t) => {
      this._drainResolve = e, this._drainReject = t;
    });
  }
  get paused() {
    return this._paused;
  }
  get disposed() {
    return this._disposed;
  }
  /**
   * Flush: instantly reveal everything remaining.
   * Used when restoring persisted sessions or force-completing.
   */
  flush() {
    var e;
    if (!this._disposed)
      for (; this.readIndex < this.items.length; ) {
        const t = this.items[this.readIndex];
        switch (t.kind) {
          case "text":
            this.cb.onTextReveal(t.messageId, t.partId, t.text, !0), this.currentSegmentText = t.text, this.cb.onLiveSpeech(this.currentSegmentText, this.currentAgentId), this.cb.onSpeechProgress(1);
            break;
          case "action":
            this.currentSegmentText = "", this.cb.onActionReady(t.messageId, t), this.cb.onLiveSpeech(null, this.currentAgentId);
            break;
          case "agent_start":
            this.currentAgentId = t.agentId, this.currentSegmentText = "", this.cb.onThinking(null), this.cb.onAgentStart(t), this.cb.onLiveSpeech(null, t.agentId);
            break;
          case "agent_end":
            this.cb.onAgentEnd(t);
            break;
          case "thinking":
            this.cb.onThinking(t);
            break;
          case "cue_user":
            this.cb.onCueUser(t.fromAgentId, t.prompt);
            break;
          case "done":
            this.cb.onLiveSpeech(null, null), this.cb.onSpeechProgress(null), this.cb.onThinking(null), this.cb.onDone(t), (e = this._drainResolve) == null || e.call(this), this._drainResolve = null, this._drainReject = null;
            break;
          case "error":
            this.cb.onError(t.message);
            break;
        }
        this.readIndex++, this.charCursor = 0;
      }
  }
  /** Stop tick loop, release resources. No more callbacks after this. */
  dispose() {
    var e;
    this._disposed || (this._disposed = !0, this.timer && (clearInterval(this.timer), this.timer = null), (e = this._drainReject) == null || e.call(this, new Error("Buffer disposed")), this._drainResolve = null, this._drainReject = null, this.cb.onLiveSpeech(null, null), this.cb.onSpeechProgress(null));
  }
  /**
   * Stop the tick timer and mark disposed WITHOUT firing final onLiveSpeech.
   * Used when replacing a buffer (e.g. resume after soft-pause) to avoid
   * the dispose callback clearing roundtable state via a stale microtask.
   */
  shutdown() {
    var e;
    this._disposed || (this._disposed = !0, this.timer && (clearInterval(this.timer), this.timer = null), (e = this._drainReject) == null || e.call(this, new Error("Buffer shutdown")), this._drainResolve = null, this._drainReject = null);
  }
  // ─── Internals ───────────────────────────────────────────────────
  /** Seal the last text item in the queue (if any). */
  sealLastText() {
    var e, t;
    for (let i = this.items.length - 1; i >= 0; i--) {
      const s = this.items[i];
      if (s.kind === "text" && !s.sealed) {
        s.sealed = !0, (t = (e = this.cb).onSegmentSealed) == null || t.call(e, s.messageId, s.partId, s.text, this.currentAgentId);
        break;
      }
      if (s.kind !== "text") break;
    }
  }
  tick() {
    var t, i, s, h, a;
    if (this._paused || this._disposed || this._dwellTicksRemaining > 0 && (this._dwellTicksRemaining--, !(this._dwellTicksRemaining === 0 && this._holdingForTTS)))
      return;
    if (this._holdingForTTS) {
      const n = (i = (t = this.cb).shouldHoldAfterReveal) == null ? void 0 : i.call(t);
      if (n) {
        if (typeof n == "object") {
          if (!n.holding) {
            this._holdingForTTS = !1, this._holdSegmentSnapshot = -1, this.advanceNonText();
            return;
          }
          if (n.segmentDone !== this._holdSegmentSnapshot) {
            this._holdingForTTS = !1, this._holdSegmentSnapshot = -1, this.advanceNonText();
            return;
          }
          return;
        }
        return;
      }
      this._holdingForTTS = !1, this._holdSegmentSnapshot = -1, this.advanceNonText();
      return;
    }
    const e = this.items[this.readIndex];
    if (e)
      switch (e.kind) {
        case "text": {
          this.charCursor = Math.min(this.charCursor + this.charsPerTick, e.text.length);
          const n = e.text.slice(0, this.charCursor), c = this.charCursor >= e.text.length && e.sealed;
          if (this.cb.onTextReveal(e.messageId, e.partId, n, c), this.currentSegmentText = n, this.cb.onLiveSpeech(this.currentSegmentText, this.currentAgentId), this.cb.onSpeechProgress(e.text.length > 0 ? this.charCursor / e.text.length : 1), c) {
            if (this.readIndex++, this.charCursor = 0, this.postTextDelayTicks > 0) {
              if (this._dwellTicksRemaining = this.postTextDelayTicks, this.cb.shouldHoldAfterReveal) {
                this._holdingForTTS = !0;
                const r = this.cb.shouldHoldAfterReveal();
                this._holdSegmentSnapshot = typeof r == "object" ? r.segmentDone : -1;
              }
              return;
            }
            {
              const r = (h = (s = this.cb).shouldHoldAfterReveal) == null ? void 0 : h.call(s);
              if (r) {
                this._holdingForTTS = !0, this._holdSegmentSnapshot = typeof r == "object" ? r.segmentDone : -1;
                return;
              }
            }
            this.advanceNonText();
          }
          break;
        }
        // Non-text items are processed immediately
        case "agent_start":
          this.currentAgentId = e.agentId, this.currentSegmentText = "", this.cb.onThinking(null), this.cb.onAgentStart(e), this.cb.onLiveSpeech(null, e.agentId), this.readIndex++, this.charCursor = 0, this.advanceNonText();
          break;
        case "agent_end":
          this.cb.onAgentEnd(e), this.readIndex++, this.charCursor = 0, this.advanceNonText();
          break;
        case "action":
          if (this.currentSegmentText = "", this.cb.onActionReady(e.messageId, e), this.cb.onLiveSpeech(null, this.currentAgentId), this.readIndex++, this.charCursor = 0, this.actionDelayTicks > 0) {
            this._dwellTicksRemaining = this.actionDelayTicks;
            return;
          }
          this.advanceNonText();
          break;
        case "thinking":
          this.cb.onThinking(e), this.readIndex++, this.charCursor = 0, this.advanceNonText();
          break;
        case "cue_user":
          this.cb.onCueUser(e.fromAgentId, e.prompt), this.readIndex++, this.charCursor = 0, this.advanceNonText();
          break;
        case "done":
          this.cb.onLiveSpeech(null, null), this.cb.onSpeechProgress(null), this.cb.onThinking(null), this.cb.onDone(e), this.readIndex++, this.charCursor = 0, this.timer && (clearInterval(this.timer), this.timer = null), (a = this._drainResolve) == null || a.call(this), this._drainResolve = null, this._drainReject = null;
          break;
        case "error":
          this.cb.onError(e.message), this.readIndex++, this.charCursor = 0, this.advanceNonText();
          break;
      }
  }
  /**
   * After processing a non-text item, keep advancing through consecutive
   * non-text items in the same tick. Stop when we hit a text item or
   * the end of the queue — the next tick will handle the text item
   * (so we don't skip the character-by-character reveal).
   *
   * Also stops when an action triggers a delay so its animation can play.
   */
  advanceNonText() {
    var e;
    for (; this.readIndex < this.items.length; ) {
      const t = this.items[this.readIndex];
      if (t.kind === "text") break;
      switch (t.kind) {
        case "agent_start":
          this.currentAgentId = t.agentId, this.currentSegmentText = "", this.cb.onThinking(null), this.cb.onAgentStart(t), this.cb.onLiveSpeech(null, t.agentId);
          break;
        case "agent_end":
          this.cb.onAgentEnd(t);
          break;
        case "action":
          if (this.currentSegmentText = "", this.cb.onActionReady(t.messageId, t), this.cb.onLiveSpeech(null, this.currentAgentId), this.readIndex++, this.charCursor = 0, this.actionDelayTicks > 0) {
            this._dwellTicksRemaining = this.actionDelayTicks;
            return;
          }
          continue;
        // no delay — keep advancing
        case "thinking":
          this.cb.onThinking(t);
          break;
        case "cue_user":
          this.cb.onCueUser(t.fromAgentId, t.prompt);
          break;
        case "done":
          this.cb.onLiveSpeech(null, null), this.cb.onSpeechProgress(null), this.cb.onThinking(null), this.cb.onDone(t), this.readIndex++, this.charCursor = 0, this.timer && (clearInterval(this.timer), this.timer = null), (e = this._drainResolve) == null || e.call(this), this._drainResolve = null, this._drainReject = null;
          return;
        // done — stop advancing
        case "error":
          this.cb.onError(t.message);
          break;
      }
      this.readIndex++, this.charCursor = 0;
    }
  }
}
export {
  o as StreamBuffer
};
//# sourceMappingURL=stream-buffer.js.map
