import { TTS_PROVIDERS as h } from "./constants.js";
import { getTTSVoices as k } from "./constants.js";
class f extends Error {
  constructor(r, s) {
    super(s), this.provider = r, this.name = "TTSRateLimitError";
  }
}
async function E(e, r) {
  const s = h[e.providerId];
  if (!s)
    throw new Error(`Unknown TTS provider: ${e.providerId}`);
  if (s.requiresApiKey && !e.apiKey)
    throw new Error(`API key required for TTS provider: ${e.providerId}`);
  switch (e.providerId) {
    case "openai-tts":
      return await v(e, r);
    case "azure-tts":
      return await S(e, r);
    case "glm-tts":
      return await b(e, r);
    case "qwen-tts":
      return await x(e, r);
    case "minimax-tts":
      return await $(e, r);
    case "doubao-tts":
      return await U(e, r);
    case "elevenlabs-tts":
      return await A(e, r);
    case "browser-native-tts":
      throw new Error(
        "Browser Native TTS must be handled client-side using Web Speech API. This provider cannot be used on the server."
      );
    default:
      throw new Error(`Unsupported TTS provider: ${e.providerId}`);
  }
}
async function v(e, r) {
  var o;
  const s = e.baseUrl || h["openai-tts"].defaultBaseUrl, t = await fetch(`${s}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.apiKey}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      model: e.modelId || "gpt-4o-mini-tts",
      input: r,
      voice: e.voice,
      speed: e.speed || 1
    })
  });
  if (!t.ok) {
    const i = await t.json().catch(() => ({ error: t.statusText }));
    throw new Error(`OpenAI TTS API error: ${((o = i.error) == null ? void 0 : o.message) || t.statusText}`);
  }
  const a = await t.arrayBuffer();
  return {
    audio: new Uint8Array(a),
    format: "mp3"
  };
}
async function S(e, r) {
  const s = e.baseUrl || h["azure-tts"].defaultBaseUrl, t = e.speed ? `${((e.speed - 1) * 100).toFixed(0)}%` : "0%", a = `
    <speak version='1.0' xml:lang='zh-CN'>
      <voice xml:lang='zh-CN' name='${e.voice}'>
        <prosody rate='${t}'>${I(r)}</prosody>
      </voice>
    </speak>
  `.trim(), o = await fetch(`${s}/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": e.apiKey,
      "Content-Type": "application/ssml+xml; charset=utf-8",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
    },
    body: a
  });
  if (!o.ok)
    throw new Error(`Azure TTS API error: ${o.statusText}`);
  const i = await o.arrayBuffer();
  return {
    audio: new Uint8Array(i),
    format: "mp3"
  };
}
async function b(e, r) {
  var o;
  const s = e.baseUrl || h["glm-tts"].defaultBaseUrl, t = await fetch(`${s}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.apiKey}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      model: e.modelId || "glm-tts",
      input: r,
      voice: e.voice,
      speed: e.speed || 1,
      volume: 1,
      response_format: "wav"
    })
  });
  if (!t.ok) {
    const i = await t.text().catch(() => t.statusText);
    let n = `GLM TTS API error: ${i}`;
    try {
      const u = JSON.parse(i);
      (o = u.error) != null && o.message && (n = `GLM TTS API error: ${u.error.message} (code: ${u.error.code})`);
    } catch {
    }
    throw new Error(n);
  }
  const a = await t.arrayBuffer();
  return {
    audio: new Uint8Array(a),
    format: "wav"
  };
}
async function x(e, r) {
  var c, m;
  const s = e.baseUrl || h["qwen-tts"].defaultBaseUrl, t = Math.round(((e.speed || 1) - 1) * 500), a = await fetch(`${s}/services/aigc/multimodal-generation/generation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.apiKey}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      model: e.modelId || "qwen3-tts-flash",
      input: {
        text: r,
        voice: e.voice,
        language_type: "Chinese"
        // Default to Chinese, can be made configurable
      },
      parameters: {
        rate: t
        // Speech rate from -500 to 500
      }
    })
  });
  if (!a.ok) {
    const l = await a.text().catch(() => a.statusText);
    throw new Error(`Qwen TTS API error: ${l}`);
  }
  const o = await a.json();
  if (!((m = (c = o.output) == null ? void 0 : c.audio) != null && m.url))
    throw new Error(`Qwen TTS error: No audio URL in response. Response: ${JSON.stringify(o)}`);
  const i = o.output.audio.url, n = await fetch(i);
  if (!n.ok)
    throw new Error(`Failed to download audio from URL: ${n.statusText}`);
  const u = await n.arrayBuffer();
  return {
    audio: new Uint8Array(u),
    format: "wav"
    // Qwen3 TTS returns WAV format
  };
}
async function $(e, r) {
  var u, c, m;
  const s = (e.baseUrl || h["minimax-tts"].defaultBaseUrl).replace(
    /\/$/,
    ""
  ), t = await fetch(`${s}/v1/t2a_v2`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.apiKey}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      model: e.modelId || "speech-2.8-hd",
      text: r,
      stream: !1,
      output_format: "hex",
      voice_setting: {
        voice_id: e.voice,
        speed: e.speed || 1,
        vol: 1,
        pitch: 0
      },
      audio_setting: {
        sample_rate: 32e3,
        bitrate: 128e3,
        format: e.format || "mp3",
        channel: 1
      },
      language_boost: "auto"
    })
  });
  if (!t.ok) {
    const l = await t.text().catch(() => t.statusText);
    throw new Error(`MiniMax TTS API error: ${l}`);
  }
  const a = await t.json(), o = (u = a == null ? void 0 : a.data) == null ? void 0 : u.audio;
  if (!o || typeof o != "string")
    throw new Error(`MiniMax TTS error: No audio returned. Response: ${JSON.stringify(a)}`);
  const i = o.trim();
  if (i.length % 2 !== 0)
    throw new Error("MiniMax TTS error: invalid hex audio payload length");
  return {
    audio: new Uint8Array(
      ((c = i.match(/.{1,2}/g)) == null ? void 0 : c.map((l) => parseInt(l, 16))) || []
    ),
    format: ((m = a == null ? void 0 : a.extra_info) == null ? void 0 : m.audio_format) || e.format || "mp3"
  };
}
async function A(e, r) {
  const s = e.baseUrl || h["elevenlabs-tts"].defaultBaseUrl, t = e.format || "mp3", a = Math.min(1.2, Math.max(0.7, e.speed || 1)), o = {
    mp3: "mp3_44100_128",
    opus: "opus_48000_96",
    pcm: "pcm_44100",
    wav: "wav_44100",
    ulaw: "ulaw_8000",
    alaw: "alaw_8000"
  }, i = o[t] || o.mp3, n = await fetch(
    `${s}/text-to-speech/${encodeURIComponent(e.voice)}?output_format=${i}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": e.apiKey,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        text: r,
        model_id: e.modelId || "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          speed: a
        }
      })
    }
  );
  if (!n.ok) {
    const c = await n.text().catch(() => n.statusText);
    throw new Error(`ElevenLabs TTS API error: ${c || n.statusText}`);
  }
  const u = await n.arrayBuffer();
  return {
    audio: new Uint8Array(u),
    format: t
  };
}
async function U(e, r) {
  const s = (e.apiKey || "").indexOf(":");
  if (s <= 0)
    throw new Error(
      'Doubao TTS requires API key in format "appId:accessKey". Get both from the Volcengine console.'
    );
  const t = e.apiKey.slice(0, s), a = e.apiKey.slice(s + 1), o = e.baseUrl || h["doubao-tts"].defaultBaseUrl, i = Math.round(((e.speed || 1) - 1) * 100), n = await fetch(`${o}/unidirectional`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-App-Id": t,
      "X-Api-Access-Key": a,
      "X-Api-Resource-Id": "seed-tts-2.0"
    },
    body: JSON.stringify({
      user: { uid: "openmaic" },
      req_params: {
        text: r,
        speaker: e.voice,
        audio_params: { format: "mp3", sample_rate: 24e3, speech_rate: i }
      }
    })
  });
  if (!n.ok) {
    const d = await n.text().catch(() => n.statusText);
    throw new Error(`Doubao TTS API error (${n.status}): ${d}`);
  }
  const u = await n.text(), c = [];
  let m = 0, l = -1;
  for (let d = 0; d < u.length; d++)
    if (u[d] === "{")
      m === 0 && (l = d), m++;
    else if (u[d] === "}" && (m--, m === 0 && l >= 0)) {
      let p;
      try {
        p = JSON.parse(u.slice(l, d + 1));
      } catch {
        l = -1;
        continue;
      }
      if (l = -1, p.code === 0 && p.data)
        c.push(new Uint8Array(Buffer.from(p.data, "base64")));
      else {
        if (p.code === 2e7)
          break;
        if (p.code && p.code !== 0)
          throw p.code === 45e6 || p.code === 45000292 ? new f(
            "doubao-tts",
            p.message || "concurrency quota exceeded"
          ) : new Error(`Doubao TTS error: ${p.message || "unknown"} (code: ${p.code})`);
      }
    }
  if (c.length === 0)
    throw new Error("Doubao TTS: no audio data received");
  const y = c.reduce((d, p) => d + p.length, 0), w = new Uint8Array(y);
  let T = 0;
  for (const d of c)
    w.set(d, T), T += d.length;
  return { audio: w, format: "mp3" };
}
function I(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
export {
  f as TTSRateLimitError,
  E as generateTTS,
  k as getTTSVoices
};
//# sourceMappingURL=tts-providers.js.map
