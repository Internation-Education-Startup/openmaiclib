import { ReactNode } from 'react';
import { Locale } from '../i18n';
type I18nContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
};
export declare function I18nProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useI18n(): I18nContextType;
export {};
//# sourceMappingURL=use-i18n.d.ts.map