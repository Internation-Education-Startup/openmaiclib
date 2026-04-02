/**
 * PDF Parsing Provider Type Definitions
 */
/**
 * PDF Provider IDs
 */
export type PDFProviderId = 'unpdf' | 'mineru';
/**
 * PDF Provider Configuration
 */
export interface PDFProviderConfig {
    id: PDFProviderId;
    name: string;
    requiresApiKey: boolean;
    baseUrl?: string;
    icon?: string;
    features: string[];
}
/**
 * PDF Parser Configuration for API calls
 */
export interface PDFParserConfig {
    providerId: PDFProviderId;
    apiKey?: string;
    baseUrl?: string;
}
//# sourceMappingURL=types.d.ts.map