/**
 * Shim for next/navigation — replaces Next.js router / params with
 * React contexts so the consuming app can inject its own router and params.
 *
 * Consuming app provides values via:
 *   <MaicRouterContext.Provider value={router}>
 *     <MaicParamsContext.Provider value={{ id: classroomId }}>
 *       <ClassroomPage />
 *     </MaicParamsContext.Provider>
 *   </MaicRouterContext.Provider>
 */
import { createContext, useContext } from 'react';

// ─── Router ──────────────────────────────────────────────────────────
export interface MaicRouter {
  push: (path: string) => void;
  back: () => void;
  replace: (path: string) => void;
  refresh: () => void;
  prefetch: (path: string) => void;
}

const defaultRouter: MaicRouter = {
  push: (path: string) => {
    window.location.href = path;
  },
  back: () => {
    window.history.back();
  },
  replace: (path: string) => {
    window.location.replace(path);
  },
  refresh: () => {
    window.location.reload();
  },
  prefetch: () => {},
};

export const MaicRouterContext = createContext<MaicRouter>(defaultRouter);

export function useRouter(): MaicRouter {
  return useContext(MaicRouterContext);
}

// ─── Params (replaces Next.js useParams) ─────────────────────────────
export const MaicParamsContext = createContext<Record<string, string>>({});

export function useParams(): Record<string, string> {
  return useContext(MaicParamsContext);
}

// ─── Other Next.js navigation hooks ──────────────────────────────────
export function usePathname(): string {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
}

export function useSearchParams() {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}

export function redirect(url: string) {
  window.location.href = url;
}
