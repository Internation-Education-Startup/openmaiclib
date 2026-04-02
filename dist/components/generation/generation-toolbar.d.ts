import { SettingsSection } from '../../lib/types/settings';
export interface GenerationToolbarProps {
    language: 'zh-CN' | 'en-US';
    onLanguageChange: (lang: 'zh-CN' | 'en-US') => void;
    webSearch: boolean;
    onWebSearchChange: (v: boolean) => void;
    onSettingsOpen: (section?: SettingsSection) => void;
    pdfFile: File | null;
    onPdfFileChange: (file: File | null) => void;
    onPdfError: (error: string | null) => void;
}
export declare function GenerationToolbar({ language, onLanguageChange, webSearch, onWebSearchChange, onSettingsOpen, pdfFile, onPdfFileChange, onPdfError, }: GenerationToolbarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=generation-toolbar.d.ts.map