# CLAUDE.md — openmaiclib

_Last updated: 2026-04-15. If the repo has changed substantially since then, trust the code over this document and consider refreshing it._

This file provides context for Claude Code (claude.ai/code) and other AI assistants working in this repository.

## What this repo is

`openmaiclib` is the **core AI teaching library** of the OpenEd platform, consumed by both the backend (`cn-eduserver`) and the frontend (`cn-webui`). It's a Vite-built library that emits both client-side and server-side bundles.

- Repo: `Internation-Education-Startup/openmaiclib` (public)
- It is an **extracted fork of the upstream OpenMAIC project**, which lives at `~/OpenMAIC` and is **read-only** — never modify the upstream; all changes happen in this repo
- Consumers:
  - `cn-eduserver` uses a local file dependency `file:./openmaiclib/packages/engine` to consume the `openmaic-engine` sub-package
  - `cn-webui` consumes the full `openmaiclib` as an npm dependency

## Two entry points

```ts
// Client — React components / Zustand stores / hooks / client-side generation pipeline
import { Stage, ChatArea, useStageStore, ... } from 'openmaiclib';

// Server — LLM calls / classroom generation pipeline / TTS / media / PDF providers
import { callLLM, generateClassroom, generateTTS, ... } from 'openmaiclib/server';
```

- `index.ts` — client entry, exports UI components, stores, hooks, and types
- `server.ts` — server entry, exports LLM, generation pipeline, providers, SSRF guard
- **Do NOT deep-import** (e.g. `openmaiclib/lib/ai/llm`) — always import from one of these two entry points

## Directory structure

```
openmaiclib/
├── index.ts                 # Client entry
├── server.ts                # Server entry
├── vite.config.ts           # Library build config (two entries + externals)
├── tsconfig.json
├── components/              # React components
│   ├── stage/               # Core stage component
│   ├── chat/                # Chat area
│   ├── generation/          # Generation toolbar, progress, outline editor
│   ├── slide-renderer/      # Slide rendering
│   ├── whiteboard/          # Whiteboard
│   ├── agent/               # Agent bar / agent UI
│   ├── roundtable/          # Roundtable discussion mode
│   ├── canvas/              # Canvas
│   ├── audio/               # Audio controls
│   ├── settings/            # Settings dialog
│   ├── ai-elements/         # AI interaction primitives
│   └── ui/                  # Generic shadcn/Radix UI
├── lib/
│   ├── ai/                  # LLM layer (callLLM / streamLLM / providers)
│   ├── server/              # Server-only: classroom-generation, provider-config, ssrf-guard,
│   │                        #              resolve-model, classroom-storage, classroom-media-generation
│   ├── generation/          # Generation pipeline: outline-generator, scene-generator, prompts
│   ├── orchestration/       # LangGraph agent orchestration + agent registry
│   ├── media/               # Image/video providers + media-orchestrator
│   ├── audio/               # TTS providers + browser-native TTS
│   ├── pdf/                 # PDF parsing providers (unpdf)
│   ├── web-search/          # Tavily search integration
│   ├── store/               # Zustand stores: canvas/stage/snapshot/keyboard/settings/user-profile
│   ├── hooks/               # React hooks: use-i18n, use-theme, use-scene-generator, etc.
│   ├── contexts/            # React contexts
│   ├── playback/            # Classroom playback engine
│   ├── prosemirror/         # Rich text editing
│   ├── pbl/                 # Project-Based Learning logic
│   ├── i18n/                # Internationalization (Chinese + English)
│   ├── types/               # Shared type definitions
│   ├── utils/               # Utilities (incl. stage-storage, image-storage)
│   ├── storage/             # Dexie/IndexedDB storage
│   ├── api/                 # API client
│   ├── export/              # Export to PPTX, etc.
│   ├── chat/                # Chat logic
│   ├── buffer/              # Buffer management
│   └── action/              # Action system
├── configs/                 # Runtime configs: animation, chart, font, hotkey, theme, shapes, etc.
├── pages/                   # Full page components (home, classroom, generation-preview)
├── packages/
│   ├── engine/              # openmaic-engine sub-package (consumed by cn-eduserver via file: dep)
│   └── ui/                  # openmaic-ui sub-package
└── shims/                   # Next.js compat shims (next/navigation, next/server)
```

## Build

```bash
npm run build         # Main library (vite build)
npm run build:engine  # packages/engine
npm run build:ui      # packages/ui
npm run build:all     # engine + ui
npm run dev           # Watch mode
```

**Build order matters**: `openmaiclib` must be built first before `cn-eduserver` or `cn-webui` can consume it.

## Key tech stack

- **AI SDK**: Vercel AI SDK (`ai`) + `@ai-sdk/openai` / `@ai-sdk/anthropic` / `@ai-sdk/google`
- **Agent orchestration**: LangGraph (`@langchain/langgraph`)
- **State management**: Zustand + Immer
- **Rich text**: ProseMirror
- **UI**: Radix UI + Base UI + shadcn + Tailwind
- **Charts**: ECharts
- **Math**: KaTeX + Temml + mathml2omml
- **Node editor**: @xyflow/react
- **Local storage**: Dexie (IndexedDB)
- **PDF**: unpdf
- **Image processing**: sharp (server-side)
- **Build**: Vite 6 + `vite-plugin-dts` + `preserveModules` for tree-shaking

## Important gotchas

### 1. Upstream OpenMAIC is read-only
- `~/OpenMAIC` is the original repo — **never modify it**
- All changes must go into this repo (`Internation-Education-Startup/openmaiclib`)
- Files under `pages/` are copied as-is from `OpenMAIC/app/`

### 2. `cn-eduserver/openmaiclib/` is a copy, not a symlink
- The backend repo contains a copy of `openmaiclib/`
- Changes in this library must be **manually synced** to the copy inside `cn-eduserver` (typically by copying `packages/engine/dist`)

### 3. Special handling in the Vite library build
- `stripUseClientPlugin` — strips Next.js `'use client'` directives (not needed in a Vite library build)
- `shims/next-navigation.ts` — replaces `next/navigation`'s `useRouter` with `MaicRouterContext`, letting consumers inject their own router
- `shims/next-server.ts` — replaces `next/server` (mostly for types)
- `peerDependencies`: `react`, `react-dom` (18 or 19)
- Many dependencies are stripped from the bundle via the `external` config — consumers must install them (see the `external` list in `vite.config.ts`)
- `sharp` and `unpdf` are native/wasm dependencies that must be installed by the consumer

### 4. Server vs client boundary
- Client imports: from `'openmaiclib'`
- Server imports: from `'openmaiclib/server'`
- Server-only code lives in `lib/server/` and parts of `lib/ai/`
- Types are shared between both sides (defined in `lib/types/`)

### 5. `packages/engine` is a standalone sub-package
- Its name is `openmaic-engine` (NOT `openmaiclib`)
- `cn-eduserver` consumes it via `file:./openmaiclib/packages/engine`
- Its `prepare` script runs `vite build`, which fails if vite isn't installed in that subdir — so `cn-eduserver` must install deps with `npm install --ignore-scripts`

### 6. Entry-point export discipline
- All public API must be explicitly exported from `index.ts` or `server.ts`
- Consumers should not use deep imports
- Types must be re-exported too (`export type { ... }`)

## Code conventions

- TypeScript strict mode
- React 19 compatible (also supports 18)
- Mix of Chinese and English comments
- Zustand stores use the Immer middleware
- Logging via `createLogger` (`lib/logger.ts`)
