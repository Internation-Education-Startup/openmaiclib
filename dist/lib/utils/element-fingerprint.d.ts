import { PPTElement } from '../types/slides';
/**
 * Generate a fingerprint string for a list of whiteboard elements.
 * Used for change detection and deduplication in history snapshots.
 *
 * Covers both geometry (id, position, size) AND semantic content
 * via structured JSON.stringify — avoids delimiter-collision issues
 * that hand-concatenated strings would have with rich-text HTML content.
 */
export declare function elementFingerprint(els: PPTElement[]): string;
//# sourceMappingURL=element-fingerprint.d.ts.map