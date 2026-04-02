import { PDFParserConfig } from './types';
import { ParsedPdfContent } from '../types/pdf';
/**
 * Parse PDF using specified provider
 */
export declare function parsePDF(config: PDFParserConfig, pdfBuffer: Buffer): Promise<ParsedPdfContent>;
/**
 * Get current PDF parser configuration from settings store
 * Note: This function should only be called in browser context
 */
export declare function getCurrentPDFConfig(): Promise<PDFParserConfig>;
export { getAllPDFProviders, getPDFProvider } from './constants';
