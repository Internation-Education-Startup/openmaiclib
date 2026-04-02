/**
 * Convert a LaTeX string to OMML (Office Math Markup Language) XML.
 *
 * Pipeline: LaTeX → MathML (temml) → strip unsupported → OMML (mathml2omml) → inject font props
 *
 * @param latex - LaTeX math expression (without delimiters)
 * @param fontSize - Optional font size in points (e.g. 12). Applied as sz on every <a:rPr> in the OMML.
 * @returns OMML XML string (an `<m:oMath>` element), or `null` if conversion fails
 */
export declare function latexToOmml(latex: string, fontSize?: number): string | null;
