import { create } from "zustand";

import { AuthUser } from "../types/models";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  signIn: (payload: { accessToken: string; refreshToken: string; user: AuthUser }) => void;
  signOut: () => void;
}

const persistedToken = localStorage.getItem("searchbugs.accessToken");
const persistedRefreshToken = localStorage.getItem("searchbugs.refreshToken");
const persistedUser = localStorage.getItem("searchbugs.user");

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: persistedToken,
  refreshToken: persistedRefreshToken,
  user: persistedUser ? (JSON.parse(persistedUser) as AuthUser) : null,
  signIn: ({ accessToken, refreshToken, user }) => {
    localStorage.setItem("searchbugs.accessToken", accessToken);
    localStorage.setItem("searchbugs.refreshToken", refreshToken);
    localStorage.setItem("searchbugs.user", JSON.stringify(user));
    set({ accessToken, refreshToken, user });
  },
  signOut: () => {
    localStorage.removeItem("searchbugs.accessToken");
    localStorage.removeItem("searchbugs.refreshToken");
    localStorage.removeItem("searchbugs.user");
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));

