function S(T) {
  const {
    engineMode: f,
    lectureSpeech: c,
    liveSpeech: l,
    speakingAgentId: o,
    thinkingState: p,
    isCueUser: a,
    isTopicPending: u,
    chatIsStreaming: r,
    discussionTrigger: h,
    playbackCompleted: m,
    idleText: b,
    speakingStudent: d,
    sessionType: v
  } = T, g = !!(o || p || r || v);
  let e;
  a ? e = "cueUser" : u ? e = "discussionPaused" : o || p || r || v ? e = "discussionActive" : h ? e = "waitingProactive" : m ? e = "completed" : f === "playing" ? e = "lecturePlaying" : f === "paused" ? e = "lecturePaused" : e = "idle";
  let n;
  l ? n = l : g ? n = "" : c ? n = c : e === "completed" ? n = "" : n = b || "";
  const y = !!(o && !l), P = !!(d && !l);
  let s;
  l && d ? s = "agent" : l ? s = "teacher" : P ? s = "agent" : y ? s = "teacher" : a ? s = null : c ? s = "teacher" : s = null;
  let i;
  l && d ? i = "agent" : l ? i = "teacher" : P ? i = "agent" : y ? i = "teacher" : g || a ? i = null : c || b ? i = "teacher" : i = null;
  let t;
  return u ? t = "play" : e === "lecturePlaying" || e === "discussionActive" ? t = "bars" : e === "completed" ? t = "restart" : e === "idle" || e === "lecturePaused" ? t = "play" : t = "none", {
    phase: e,
    sourceText: n,
    bubbleRole: i,
    activeRole: s,
    buttonState: t,
    isInLiveFlow: g,
    isTopicActive: r || u || a || f === "live" || !!h
  };
}
export {
  S as computePlaybackView
};
//# sourceMappingURL=derived-state.js.map
