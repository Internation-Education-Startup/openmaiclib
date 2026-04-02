export interface MaicRouter {
    push: (path: string) => void;
    back: () => void;
    replace: (path: string) => void;
    refresh: () => void;
    prefetch: (path: string) => void;
}
export declare const MaicRouterContext: import('react').Context<MaicRouter>;
export declare function useRouter(): MaicRouter;
export declare const MaicParamsContext: import('react').Context<Record<string, string>>;
export declare function useParams(): Record<string, string>;
export declare function usePathname(): string;
export declare function useSearchParams(): URLSearchParams;
export declare function redirect(url: string): void;
