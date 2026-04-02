import { LanguageModel } from 'ai';
import { StatelessChatRequest, StatelessEvent, ParsedAction } from '../types/chat';
import { ThinkingConfig } from '../types/provider';
/**
 * Parser state for incremental JSON Array parsing.
 *
 * Accumulates raw text from the LLM stream. Once the opening `[` is found,
 * uses `partial-json` to incrementally parse the growing array. Emits new
 * complete items as they appear, and streams partial text content deltas
 * for the last (potentially incomplete) text item.
 */
interface ParserState {
    /** Accumulated raw text from the LLM */
    buffer: string;
    /** Whether we've found the opening `[` */
    jsonStarted: boolean;
    /** Number of fully processed (emitted) items */
    lastParsedItemCount: number;
    /** Length of text content already emitted for the trailing partial text item */
    lastPartialTextLength: number;
    /** Whether parsing is complete (closing `]` found) */
    isDone: boolean;
}
/**
 * Create initial parser state
 */
export declare function createParserState(): ParserState;
/**
 * Result from parsing a chunk
 */
export interface ParseResult {
    textChunks: string[];
    actions: ParsedAction[];
    isDone: boolean;
    /** Ordered sequence recording original interleaving of text and action segments */
    ordered: Array<{
        type: 'text';
        index: number;
    } | {
        type: 'action';
        index: number;
    }>;
}
/**
 * Parse streaming chunks of structured JSON Array output.
 *
 * The LLM is expected to produce a JSON array like:
 * [{"type":"action","name":"spotlight","params":{"elementId":"img_1"}},
 *  {"type":"text","content":"Hello students..."},...]
 *
 * This parser:
 * 1. Accumulates chunks into a buffer
 * 2. Skips any prefix before `[` (e.g. ```json\n, explanatory text)
 * 3. Uses partial-json to incrementally parse the growing array
 * 4. Emits new complete items (action→toolCall, text→textChunk)
 * 5. For the trailing incomplete text item, emits content deltas for streaming
 * 6. Marks done when the buffer contains the closing `]`
 *
 * @param chunk - New chunk of text to parse
 * @param state - Current parser state (mutated in place)
 * @returns Parsed text chunks and tool calls from this chunk
 */
export declare function parseStructuredChunk(chunk: string, state: ParserState): ParseResult;
/**
 * Finalize parsing after the stream ends.
 *
 * Handles the case where the model never produced a valid JSON array —
 * e.g. it output plain text instead of the expected `[...]` format.
 * Emits whatever content is in the buffer as a single text item so the
 * frontend can still display something rather than showing nothing.
 */
export declare function finalizeParser(state: ParserState): ParseResult;
/**
 * Stateless generation with streaming via LangGraph orchestration
 *
 * @param request - The chat request with full state
 * @param abortSignal - Signal for cancellation
 * @yields StatelessEvent objects for streaming
 */
export declare function statelessGenerate(request: StatelessChatRequest, abortSignal: AbortSignal, languageModel: LanguageModel, thinkingConfig?: ThinkingConfig): AsyncGenerator<StatelessEvent>;
export {};
