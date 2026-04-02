import { create as t } from "zustand";
import { persist as e } from "zustand/middleware";
const s = [
  "/avatars/user.png",
  "/avatars/teacher-2.png",
  "/avatars/assist-2.png",
  "/avatars/clown-2.png",
  "/avatars/curious-2.png",
  "/avatars/note-taker-2.png",
  "/avatars/thinker-2.png"
], i = t()(
  e(
    (r) => ({
      avatar: s[0],
      nickname: "",
      bio: "",
      setAvatar: (a) => r({ avatar: a }),
      setNickname: (a) => r({ nickname: a }),
      setBio: (a) => r({ bio: a })
    }),
    {
      name: "user-profile-storage"
    }
  )
);
export {
  s as AVATAR_OPTIONS,
  i as useUserProfileStore
};
//# sourceMappingURL=user-profile.js.map
