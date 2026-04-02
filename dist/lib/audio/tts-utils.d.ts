import { TTSProviderId } from './types';
import { Action } from '../types/action';
/** Provider-specific max text length limits. */
export declare const TTS_MAX_TEXT_LENGTH: Partial<Record<TTSProviderId, number>>;
/**
 * Split long text into chunks that respect sentence boundaries.
 * Tries splitting at sentence-ending punctuation first, then clause-level
 * punctuation, and finally hard-splits at maxLength as a last resort.
 */
export declare function splitLongSpeechText(text: string, maxLength: number): string[];
/**
 * Split long speech actions into multiple shorter actions so each stays
 * within the TTS provider's text length limit. Each sub-action gets its
 * own independent audio file — no byte concatenation needed.
 */
export declare function splitLongSpeechActions(actions: Action[], providerId: TTSProviderId): Action[];
//# sourceMappingURL=tts-utils.d.ts.map