/**
 * Image Storage Utilities
 *
 * Store PDF images in IndexedDB to avoid sessionStorage 5MB limit.
 * Images are stored as Blobs for efficient storage.
 */
/**
 * Store images in IndexedDB
 * Returns array of stored image IDs
 */
export declare function storeImages(images: Array<{
    id: string;
    src: string;
    pageNumber?: number;
}>): Promise<string[]>;
/**
 * Load images from IndexedDB and return as imageMapping
 * @param imageIds - Array of storage IDs (session_xxx_img_1 format)
 * @returns ImageMapping { img_1: "data:image/png;base64,..." }
 */
export declare function loadImageMapping(imageIds: string[]): Promise<Record<string, string>>;
/**
 * Clean up images by session prefix
 */
export declare function cleanupSessionImages(sessionId: string): Promise<void>;
/**
 * Clean up old images (older than specified hours)
 */
export declare function cleanupOldImages(hoursOld?: number): Promise<void>;
/**
 * Get total size of stored images
 */
export declare function getImageStorageSize(): Promise<number>;
/**
 * Store a PDF file as a Blob in IndexedDB.
 * Returns a storage key that can be used to retrieve the blob later.
 */
export declare function storePdfBlob(file: File): Promise<string>;
/**
 * Load a PDF Blob from IndexedDB by its storage key.
 */
export declare function loadPdfBlob(key: string): Promise<Blob | null>;
