import { StorageProvider, StorageType } from '../types';
/** No-op provider used when no external storage is configured. */
export declare class NoopStorageProvider implements StorageProvider {
    upload(): Promise<string>;
    exists(): Promise<boolean>;
    getUrl(): string;
    batchExists(_hashes: string[], _type: StorageType): Promise<Set<string>>;
}
