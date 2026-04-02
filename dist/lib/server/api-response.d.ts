import { NextResponse } from '../../shims/next-server.ts';
export declare const API_ERROR_CODES: {
    readonly MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD";
    readonly MISSING_API_KEY: "MISSING_API_KEY";
    readonly INVALID_REQUEST: "INVALID_REQUEST";
    readonly INVALID_URL: "INVALID_URL";
    readonly REDIRECT_NOT_ALLOWED: "REDIRECT_NOT_ALLOWED";
    readonly CONTENT_SENSITIVE: "CONTENT_SENSITIVE";
    readonly UPSTREAM_ERROR: "UPSTREAM_ERROR";
    readonly GENERATION_FAILED: "GENERATION_FAILED";
    readonly TRANSCRIPTION_FAILED: "TRANSCRIPTION_FAILED";
    readonly PARSE_FAILED: "PARSE_FAILED";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
};
export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
export interface ApiErrorBody {
    success: false;
    errorCode: ApiErrorCode;
    error: string;
    details?: string;
}
export declare function apiError(code: ApiErrorCode, status: number, error: string, details?: string): NextResponse<ApiErrorBody>;
export declare function apiSuccess<T extends Record<string, unknown>>(data: T, status?: number): NextResponse;
//# sourceMappingURL=api-response.d.ts.map