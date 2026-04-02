import { useCanvasStore as y } from "../store/canvas.js";
import { useSettingsStore as v } from "../store/settings.js";
import { createLogger as E } from "../logger.js";
const a = E("PlaybackEngine"), P = 0.3;
class L {
  // remaining ms (set on pause)
  constructor(e, s, t, r = {}) {
    var o;
    this.scenes = [], this.sceneIndex = 0, this.actionIndex = 0, this.mode = "idle", this.consumedDiscussions = /* @__PURE__ */ new Set(), this.savedSceneIndex = null, this.savedActionIndex = null, this.currentTopicState = null, this.currentTrigger = null, this.triggerDelayTimer = null, this.speechTimer = null, this.speechTimerStart = 0, this.browserTTSActive = !1, this.browserTTSChunks = [], this.browserTTSChunkIndex = 0, this.browserTTSPausedChunks = [], this.speechTimerRemaining = 0, this.cachedVoices = null, this.scenes = e, this.sceneId = (o = e[0]) == null ? void 0 : o.id, this.actionEngine = s, this.audioPlayer = t, this.callbacks = r;
  }
  // ==================== Public API ====================
  /** Get the current engine mode */
  getMode() {
    return this.mode;
  }
  /** Export a serializable playback snapshot */
  getSnapshot() {
    return {
      sceneIndex: this.sceneIndex,
      actionIndex: this.actionIndex,
      consumedDiscussions: [...this.consumedDiscussions],
      sceneId: this.sceneId
    };
  }
  /** Restore playback position from a snapshot */
  restoreFromSnapshot(e) {
    this.sceneIndex = e.sceneIndex, this.actionIndex = e.actionIndex, this.consumedDiscussions = new Set(e.consumedDiscussions);
  }
  /** idle → playing (from beginning) */
  start() {
    if (this.mode !== "idle") {
      a.warn("Cannot start: not idle, current mode:", this.mode);
      return;
    }
    this.sceneIndex = 0, this.actionIndex = 0, this.setMode("playing"), this.processNext();
  }
  /** idle → playing (continue from current position, e.g. after discussion end) */
  continuePlayback() {
    if (this.mode !== "idle") {
      a.warn("Cannot continue: not idle, current mode:", this.mode);
      return;
    }
    this.setMode("playing"), this.processNext();
  }
  /** playing → paused | live → paused (abort SSE, truncate, topic pending) */
  pause() {
    var e;
    this.mode === "playing" ? (this.triggerDelayTimer && (clearTimeout(this.triggerDelayTimer), this.triggerDelayTimer = null), this.speechTimer && (this.speechTimerRemaining = Math.max(
      0,
      this.speechTimerRemaining - (Date.now() - this.speechTimerStart)
    ), clearTimeout(this.speechTimer), this.speechTimer = null), this.setMode("paused"), this.currentTrigger || (this.browserTTSActive ? (this.browserTTSPausedChunks = this.browserTTSChunks.slice(this.browserTTSChunkIndex), (e = window.speechSynthesis) == null || e.cancel()) : this.audioPlayer.isPlaying() && this.audioPlayer.pause())) : this.mode === "live" ? (this.setMode("paused"), this.currentTopicState = "pending") : a.warn("Cannot pause: mode is", this.mode);
  }
  /** paused → playing (TTS resume) | paused (in discussion) → live */
  resume() {
    if (this.mode !== "paused") {
      a.warn("Cannot resume: not paused, mode is", this.mode);
      return;
    }
    this.currentTopicState === "pending" ? (this.currentTopicState = "active", this.setMode("live")) : this.currentTrigger ? this.setMode("playing") : (this.setMode("playing"), this.browserTTSPausedChunks.length > 0 ? (this.browserTTSActive = !0, this.browserTTSChunks = this.browserTTSPausedChunks, this.browserTTSChunkIndex = 0, this.browserTTSPausedChunks = [], this.playBrowserTTSChunk()) : this.audioPlayer.hasActiveAudio() ? this.audioPlayer.resume() : this.speechTimerRemaining > 0 ? (this.speechTimerStart = Date.now(), this.speechTimer = setTimeout(() => {
      var e, s;
      this.speechTimer = null, this.speechTimerRemaining = 0, (s = (e = this.callbacks).onSpeechEnd) == null || s.call(e), this.mode === "playing" && this.processNext();
    }, this.speechTimerRemaining)) : this.processNext());
  }
  /** → idle */
  stop() {
    this.setMode("idle"), this.audioPlayer.stop(), this.cancelBrowserTTS(), this.actionEngine.clearEffects(), this.triggerDelayTimer && (clearTimeout(this.triggerDelayTimer), this.triggerDelayTimer = null), this.speechTimer && (clearTimeout(this.speechTimer), this.speechTimer = null), this.speechTimerRemaining = 0, this.sceneIndex = 0, this.actionIndex = 0, this.savedSceneIndex = null, this.savedActionIndex = null, this.currentTopicState = null, this.currentTrigger = null;
  }
  /** User clicks "Join" on ProactiveCard → save cursor → live */
  confirmDiscussion() {
    var e, s, t, r;
    if (!this.currentTrigger) {
      a.warn("confirmDiscussion called but no trigger");
      return;
    }
    this.consumedDiscussions.add(this.currentTrigger.id), this.savedSceneIndex = this.sceneIndex, this.savedActionIndex = this.actionIndex, this.currentTopicState = "active", this.setMode("live"), (s = (e = this.callbacks).onProactiveHide) == null || s.call(e), (r = (t = this.callbacks).onDiscussionConfirmed) == null || r.call(
      t,
      this.currentTrigger.question,
      this.currentTrigger.prompt,
      this.currentTrigger.agentId
    ), this.currentTrigger = null;
  }
  /** User clicks "Skip" on ProactiveCard → consumed → processNext */
  skipDiscussion() {
    var e, s;
    this.currentTrigger && (this.consumedDiscussions.add(this.currentTrigger.id), this.currentTrigger = null), (s = (e = this.callbacks).onProactiveHide) == null || s.call(e), this.mode === "playing" && this.processNext();
  }
  /** End discussion → restore lecture → idle (user clicks "start" to continue) */
  handleEndDiscussion() {
    var e, s;
    this.actionEngine.clearEffects(), this.currentTopicState = "closed", y.getState().setWhiteboardOpen(!1), (s = (e = this.callbacks).onDiscussionEnd) == null || s.call(e), this.restoreSavedLectureState(), this.setMode("idle");
  }
  /**
   * Exit live discussion mode after a request failure without treating it as a
   * normal discussion end. The chat session stays retryable; this only restores
   * the playback engine to a coherent non-live state.
   */
  handleDiscussionError() {
    const e = this.savedSceneIndex !== null && this.savedActionIndex !== null;
    !(this.mode === "live" || this.mode === "paused" && this.currentTopicState === "pending") && !e || (this.actionEngine.clearEffects(), y.getState().setWhiteboardOpen(!1), this.currentTopicState = "closed", this.currentTrigger = null, this.restoreSavedLectureState(), this.setMode("idle"));
  }
  /** User sends a message during playback → interrupt → live mode */
  handleUserInterrupt(e) {
    var s, t;
    (this.mode === "playing" || this.mode === "paused") && (this.savedSceneIndex === null && (this.savedSceneIndex = this.sceneIndex, this.savedActionIndex = Math.max(0, this.actionIndex - 1)), this.triggerDelayTimer && (clearTimeout(this.triggerDelayTimer), this.triggerDelayTimer = null)), this.currentTopicState = "active", this.setMode("live"), this.audioPlayer.stop(), this.cancelBrowserTTS(), (t = (s = this.callbacks).onUserInterrupt) == null || t.call(s, e);
  }
  /** Whether all remaining actions have been consumed (no speech left to play) */
  isExhausted() {
    let e = this.sceneIndex, s = this.actionIndex;
    for (; e < this.scenes.length; ) {
      const t = this.scenes[e].actions || [];
      for (; s < t.length; ) {
        const r = t[s];
        if (r.type === "discussion" && this.consumedDiscussions.has(r.id)) {
          s++;
          continue;
        }
        return !1;
      }
      e++, s = 0;
    }
    return !0;
  }
  // ==================== Private ====================
  setMode(e) {
    var s, t;
    this.mode !== e && (this.mode = e, (t = (s = this.callbacks).onModeChange) == null || t.call(s, e));
  }
  restoreSavedLectureState() {
    this.savedSceneIndex !== null && this.savedActionIndex !== null && (this.sceneIndex = this.savedSceneIndex, this.actionIndex = this.savedActionIndex), this.savedSceneIndex = null, this.savedActionIndex = null;
  }
  /**
   * Get the current action, or null if playback is complete.
   * Advances sceneIndex automatically when a scene's actions are exhausted.
   */
  getCurrentAction() {
    for (; this.sceneIndex < this.scenes.length; ) {
      const e = this.scenes[this.sceneIndex], s = e.actions || [];
      if (this.actionIndex < s.length)
        return { action: s[this.actionIndex], sceneId: e.id };
      this.sceneIndex++, this.actionIndex = 0;
    }
    return null;
  }
  /**
   * Core processing loop: consume the next action.
   */
  async processNext() {
    var t, r, o, d, l, u, T, g, c, m, S, w;
    if (this.mode !== "playing") return;
    if (this.actionIndex === 0 && this.sceneIndex < this.scenes.length) {
      const i = this.scenes[this.sceneIndex];
      this.actionEngine.clearEffects(), (r = (t = this.callbacks).onSceneChange) == null || r.call(t, i.id), (d = (o = this.callbacks).onSpeakerChange) == null || d.call(o, "teacher");
    }
    const e = this.getCurrentAction();
    if (!e) {
      this.actionEngine.clearEffects(), this.setMode("idle"), (u = (l = this.callbacks).onComplete) == null || u.call(l);
      return;
    }
    const { action: s } = e;
    switch ((g = (T = this.callbacks).onProgress) == null || g.call(T, this.getSnapshot()), this.actionIndex++, s.type) {
      case "speech": {
        const i = s;
        (m = (c = this.callbacks).onSpeechStart) == null || m.call(c, i.text), this.audioPlayer.onEnded(() => {
          var n, h;
          (h = (n = this.callbacks).onSpeechEnd) == null || h.call(n), this.mode === "playing" && this.processNext();
        });
        const p = () => {
          var x, b;
          const n = i.text, C = (n.match(/[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g) || []).length > n.length * 0.3, D = ((b = (x = this.callbacks).getPlaybackSpeed) == null ? void 0 : b.call(x)) ?? 1, f = (C ? Math.max(2e3, n.length * 150) : Math.max(2e3, n.split(/\s+/).filter(Boolean).length * 240)) / D;
          this.speechTimerStart = Date.now(), this.speechTimerRemaining = f, this.speechTimer = setTimeout(() => {
            var I, k;
            this.speechTimer = null, this.speechTimerRemaining = 0, (k = (I = this.callbacks).onSpeechEnd) == null || k.call(I), this.mode === "playing" && this.processNext();
          }, f);
        };
        this.audioPlayer.play(i.audioId || "", i.audioUrl).then((n) => {
          if (!n) {
            const h = v.getState();
            h.ttsEnabled && h.ttsProviderId === "browser-native-tts" && typeof window < "u" && window.speechSynthesis ? this.playBrowserTTS(i) : p();
          }
        }).catch((n) => {
          a.error("TTS error:", n), p();
        });
        break;
      }
      case "spotlight":
      case "laser": {
        this.actionEngine.execute(s), (w = (S = this.callbacks).onEffectFire) == null || w.call(S, {
          kind: s.type,
          targetId: s.elementId,
          ...s.type === "spotlight" ? { dimOpacity: s.dimOpacity } : { color: s.color }
        }), this.processNext();
        break;
      }
      case "discussion": {
        const i = s;
        if (this.consumedDiscussions.has(i.id)) {
          this.processNext();
          return;
        }
        if (i.agentId && this.callbacks.isAgentSelected && !this.callbacks.isAgentSelected(i.agentId)) {
          this.consumedDiscussions.add(i.id), this.processNext();
          return;
        }
        const p = {
          id: i.id,
          question: i.topic,
          prompt: i.prompt,
          agentId: i.agentId
        };
        this.triggerDelayTimer = setTimeout(() => {
          var n, h;
          this.triggerDelayTimer = null, this.mode === "playing" && (this.currentTrigger = p, (h = (n = this.callbacks).onProactiveShow) == null || h.call(n, p));
        }, 3e3);
        break;
      }
      case "play_video":
      case "wb_open":
      case "wb_draw_text":
      case "wb_draw_shape":
      case "wb_draw_chart":
      case "wb_draw_latex":
      case "wb_draw_table":
      case "wb_clear":
      case "wb_delete":
      case "wb_close": {
        await this.actionEngine.execute(s), this.mode === "playing" && this.processNext();
        break;
      }
      default:
        this.processNext();
        break;
    }
  }
  // ==================== Browser Native TTS ====================
  /**
   * Split text into sentence-level chunks for sequential playback.
   * Chrome has a bug where utterances >~15s are silently cut off and onend
   * never fires, causing the engine to hang. Chunking avoids this.
   */
  splitIntoChunks(e) {
    const s = e.split(new RegExp("(?<=[.!?。！？\\n])\\s*")).map((t) => t.trim()).filter((t) => t.length > 0);
    return s.length > 0 ? s : [e];
  }
  /**
   * Play text using the Web Speech API (browser-native TTS).
   * Splits text into sentence-level chunks to avoid Chrome's ~15s cutoff.
   * Uses cancel+re-speak for pause/resume (Firefox compatibility).
   */
  playBrowserTTS(e) {
    this.browserTTSChunks = this.splitIntoChunks(e.text), this.browserTTSChunkIndex = 0, this.browserTTSPausedChunks = [], this.browserTTSActive = !0, this.playBrowserTTSChunk();
  }
  /** Speak the current chunk; on completion, advance to next or finish. */
  async playBrowserTTSChunk() {
    var l, u, T, g;
    if (this.browserTTSChunkIndex >= this.browserTTSChunks.length) {
      this.browserTTSActive = !1, this.browserTTSChunks = [], (u = (l = this.callbacks).onSpeechEnd) == null || u.call(l), this.mode === "playing" && this.processNext();
      return;
    }
    const e = v.getState(), s = this.browserTTSChunks[this.browserTTSChunkIndex], t = new SpeechSynthesisUtterance(s), r = ((g = (T = this.callbacks).getPlaybackSpeed) == null ? void 0 : g.call(T)) ?? 1;
    t.rate = (e.ttsSpeed ?? 1) * r, t.volume = e.ttsMuted ? 0 : e.ttsVolume ?? 1;
    const o = await this.ensureVoicesLoaded();
    let d = !1;
    if (e.ttsVoice && e.ttsVoice !== "default") {
      const c = o.find((m) => m.voiceURI === e.ttsVoice);
      c && (t.voice = c, t.lang = c.lang, d = !0);
    }
    if (!d) {
      const c = (s.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length / s.length;
      t.lang = c > P ? "zh-CN" : "en-US";
    }
    t.onend = () => {
      this.browserTTSChunkIndex++, this.mode === "playing" && this.playBrowserTTSChunk();
    }, t.onerror = (c) => {
      c.error !== "canceled" && (a.warn("Browser TTS chunk error:", c.error), this.browserTTSChunkIndex++, this.mode === "playing" && this.playBrowserTTSChunk());
    }, window.speechSynthesis.cancel(), window.speechSynthesis.speak(t);
  }
  async ensureVoicesLoaded() {
    if (this.cachedVoices && this.cachedVoices.length > 0)
      return this.cachedVoices;
    let e = window.speechSynthesis.getVoices();
    return e.length > 0 ? (this.cachedVoices = e, e) : (await new Promise((s) => {
      const t = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", t), s();
      };
      window.speechSynthesis.addEventListener("voiceschanged", t), setTimeout(() => {
        window.speechSynthesis.removeEventListener("voiceschanged", t), s();
      }, 2e3);
    }), e = window.speechSynthesis.getVoices(), this.cachedVoices = e, e);
  }
  /** Cancel any active browser-native TTS */
  cancelBrowserTTS() {
    var e;
    this.browserTTSActive && (this.browserTTSActive = !1, this.browserTTSChunks = [], this.browserTTSChunkIndex = 0, this.browserTTSPausedChunks = [], (e = window.speechSynthesis) == null || e.cancel());
  }
}
export {
  L as PlaybackEngine
};
//# sourceMappingURL=engine.js.map
