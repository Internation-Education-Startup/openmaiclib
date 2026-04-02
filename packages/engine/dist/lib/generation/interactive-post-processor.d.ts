/**
 * Interactive HTML Post-Processor
 *
 * Ported from Python's PostProcessor class (learn-your-way/concept_to_html.py:287-385)
 *
 * Handles:
 * - LaTeX delimiter conversion ($$...$$ -> \[...\], $...$ -> \(...\))
 * - KaTeX CSS/JS injection with auto-render and MutationObserver
 * - Script tag protection during LaTeX conversion
 */
/**
 * Main entry point: post-process generated interactive HTML
 * Converts LaTeX delimiters and injects KaTeX rendering resources.
 */
export declare function postProcessInteractiveHtml(html: string): string;
