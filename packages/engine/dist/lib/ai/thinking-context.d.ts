import { AsyncLocalStorage } from 'node:async_hooks';
import { ThinkingConfig } from '../types/provider';
export declare const thinkingContext: AsyncLocalStorage<ThinkingConfig>;
