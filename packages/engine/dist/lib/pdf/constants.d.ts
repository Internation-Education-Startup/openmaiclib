import { PDFProviderId, PDFProviderConfig } from './types';
/**
 * PDF Provider Registry
 */
export declare const PDF_PROVIDERS: Record<PDFProviderId, PDFProviderConfig>;
/**
 * Get all available PDF providers
 */
export declare function getAllPDFProviders(): PDFProviderConfig[];
/**
 * Get PDF provider by ID
 */
export declare function getPDFProvider(providerId: PDFProviderId): PDFProviderConfig | undefined;
