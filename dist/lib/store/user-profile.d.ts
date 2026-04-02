/**
 * User Profile Store
 * Persists avatar, nickname & bio to localStorage
 */
/** Predefined avatar options */
export declare const AVATAR_OPTIONS: readonly ["/avatars/user.png", "/avatars/teacher-2.png", "/avatars/assist-2.png", "/avatars/clown-2.png", "/avatars/curious-2.png", "/avatars/note-taker-2.png", "/avatars/thinker-2.png"];
export interface UserProfileState {
    /** Local avatar path or data-URL (for custom uploads) */
    avatar: string;
    nickname: string;
    bio: string;
    setAvatar: (avatar: string) => void;
    setNickname: (nickname: string) => void;
    setBio: (bio: string) => void;
}
export declare const useUserProfileStore: import('zustand').UseBoundStore<Omit<import('zustand').StoreApi<UserProfileState>, "setState" | "persist"> & {
    setState(partial: UserProfileState | Partial<UserProfileState> | ((state: UserProfileState) => UserProfileState | Partial<UserProfileState>), replace?: false): unknown;
    setState(state: UserProfileState | ((state: UserProfileState) => UserProfileState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import('zustand/middleware').PersistOptions<UserProfileState, UserProfileState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UserProfileState) => void) => () => void;
        onFinishHydration: (fn: (state: UserProfileState) => void) => () => void;
        getOptions: () => Partial<import('zustand/middleware').PersistOptions<UserProfileState, UserProfileState, unknown>>;
    };
}>;
//# sourceMappingURL=user-profile.d.ts.map