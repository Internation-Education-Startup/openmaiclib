import { ReactNode } from 'react';
/**
 * Resolve an action name to its i18n display name.
 * Falls back to the raw actionName if no translation exists.
 */
export declare function getActionDisplayName(t: (key: string) => string, actionName: string): string;
/**
 * Get a localized status badge for action state.
 */
export declare function getStatusBadge(t: (key: string) => string, state: string): ReactNode;
/**
 * Extract text parts from a message
 */
export declare function getMessageTextParts(message: {
    parts?: Array<{
        type: string;
        text?: string;
        [key: string]: unknown;
    }>;
}): {
    [key: string]: unknown;
    type: string;
    text?: string;
}[];
/**
 * Extract action parts from a message
 */
export declare function getMessageActionParts(message: {
    parts?: Array<{
        type: string;
        [key: string]: unknown;
    }>;
}): {
    [key: string]: unknown;
    type: string;
}[];
