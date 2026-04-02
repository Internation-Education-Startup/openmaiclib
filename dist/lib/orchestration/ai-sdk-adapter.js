import { BaseChatModel as l } from "@langchain/core/language_models/chat_models";
import { HumanMessage as g, AIMessage as o, SystemMessage as u } from "@langchain/core/messages";
import { callLLM as d, streamLLM as h } from "../ai/llm.js";
import { createLogger as m } from "../logger.js";
const c = m("AISdkAdapter");
class L extends l {
  constructor(t, e) {
    super({}), this.languageModel = t, this.thinking = e;
  }
  _llmType() {
    return "ai-sdk";
  }
  _combineLLMOutput() {
    return {};
  }
  /**
   * Convert LangChain messages to AI SDK message format
   */
  convertMessages(t) {
    return t.map((e) => e instanceof g ? { role: "user", content: e.content } : e instanceof o ? { role: "assistant", content: e.content } : e instanceof u ? { role: "system", content: e.content } : { role: "user", content: e.content });
  }
  async _generate(t, e, a) {
    const s = this.convertMessages(t);
    try {
      const n = (await d(
        {
          model: this.languageModel,
          messages: s
        },
        "chat-adapter",
        void 0,
        this.thinking
      )).text || "";
      c.info("[AI SDK Adapter] Response:", {
        textLength: n.length
      });
      const i = new o({ content: n });
      return {
        generations: [
          {
            text: n,
            message: i
          }
        ],
        llmOutput: {}
      };
    } catch (r) {
      throw c.error("[AI SDK Adapter Error]", r), r;
    }
  }
  /**
   * Stream generate with text deltas
   *
   * Yields chunks of text as they arrive, then yields done with full content.
   * Uses streamLLM which goes through Vercel AI SDK's streamText.
   */
  async *streamGenerate(t, e) {
    const a = this.convertMessages(t), s = h(
      {
        model: this.languageModel,
        messages: a,
        abortSignal: e == null ? void 0 : e.signal
      },
      "chat-adapter-stream",
      this.thinking
    );
    let r = "";
    for await (const n of s.textStream)
      n && (r += n, yield { type: "delta", content: n });
    yield { type: "done", content: r };
  }
}
export {
  L as AISdkLangGraphAdapter
};
//# sourceMappingURL=ai-sdk-adapter.js.map
