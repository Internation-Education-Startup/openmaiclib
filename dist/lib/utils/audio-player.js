import { db as o } from "./database.js";
import { createLogger as d } from "../logger.js";
const u = d("AudioPlayer");
class h {
  constructor() {
    this.audio = null, this.onEndedCallback = null, this.muted = !1, this.volume = 1, this.playbackRate = 1;
  }
  /**
   * Play audio (from URL or IndexedDB pre-generated cache)
   * @param audioId Audio ID
   * @param audioUrl Optional server-generated audio URL (takes priority over IndexedDB)
   * @returns true if audio started playing, false if no audio (TTS disabled or not generated)
   */
  async play(a, e) {
    try {
      if (e)
        return this.stop(), this.audio = new Audio(), this.audio.src = e, this.muted ? this.audio.volume = 0 : this.audio.volume = this.volume, this.audio.defaultPlaybackRate = this.playbackRate, this.audio.playbackRate = this.playbackRate, this.audio.addEventListener("ended", () => {
          var t;
          (t = this.onEndedCallback) == null || t.call(this);
        }), await this.audio.play(), this.audio.playbackRate = this.playbackRate, !0;
      const i = await o.audioFiles.get(a);
      if (!i)
        return !1;
      this.stop(), this.audio = new Audio();
      const s = URL.createObjectURL(i.blob);
      return this.audio.src = s, this.muted ? this.audio.volume = 0 : this.audio.volume = this.volume, this.audio.defaultPlaybackRate = this.playbackRate, this.audio.playbackRate = this.playbackRate, this.audio.addEventListener("ended", () => {
        var t;
        URL.revokeObjectURL(s), (t = this.onEndedCallback) == null || t.call(this);
      }), await this.audio.play(), this.audio.playbackRate = this.playbackRate, !0;
    } catch (i) {
      throw u.error("Failed to play audio:", i), i;
    }
  }
  /**
   * Pause playback
   */
  pause() {
    this.audio && !this.audio.paused && this.audio.pause();
  }
  /**
   * Stop playback
   */
  stop() {
    this.audio && (this.audio.pause(), this.audio.currentTime = 0, this.audio = null);
  }
  /**
   * Resume playback
   */
  resume() {
    var a;
    (a = this.audio) != null && a.paused && (this.audio.playbackRate = this.playbackRate, this.audio.play().catch((e) => {
      u.error("Failed to resume audio:", e);
    }));
  }
  /**
   * Get current playback status (actively playing, not paused)
   */
  isPlaying() {
    return this.audio !== null && !this.audio.paused;
  }
  /**
   * Whether there is active audio (playing or paused, but not ended)
   * Used to decide whether to resume playback or skip to the next line
   */
  hasActiveAudio() {
    return this.audio !== null;
  }
  /**
   * Get current playback time (milliseconds)
   */
  getCurrentTime() {
    return this.audio ? this.audio.currentTime * 1e3 : 0;
  }
  /**
   * Get audio duration (milliseconds)
   */
  getDuration() {
    return this.audio && !isNaN(this.audio.duration) ? this.audio.duration * 1e3 : 0;
  }
  /**
   * Set playback ended callback
   */
  onEnded(a) {
    this.onEndedCallback = a;
  }
  /**
   * Set mute state (takes effect immediately on currently playing audio)
   */
  setMuted(a) {
    this.muted = a, this.audio && (this.audio.volume = a ? 0 : this.volume);
  }
  /**
   * Set volume (0-1)
   */
  setVolume(a) {
    this.volume = Math.max(0, Math.min(1, a)), this.audio && !this.muted && (this.audio.volume = this.volume);
  }
  /**
   * Set playback speed (takes effect immediately on currently playing audio)
   */
  setPlaybackRate(a) {
    this.playbackRate = Math.max(0.5, Math.min(2, a)), this.audio && (this.audio.playbackRate = this.playbackRate);
  }
  /**
   * Destroy the player
   */
  destroy() {
    this.stop(), this.onEndedCallback = null;
  }
}
function c() {
  return new h();
}
export {
  h as AudioPlayer,
  c as createAudioPlayer
};
//# sourceMappingURL=audio-player.js.map
