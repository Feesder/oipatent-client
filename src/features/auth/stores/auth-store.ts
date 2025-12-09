import { Auth } from "@/src/common/entities/auth";
import { User } from "@/src/common/entities/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (auth: Auth, user: User) => void;
  clearAuth: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist((set, get) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    setAuth: (auth, user) => {
      console.log(auth, user);
      set({
        token: auth.accessToken,
        user: user,
        isAuthenticated: true,
      });
    },
    clearAuth: () => {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    },
    getToken: () => get().token,
  }), {
    name: 'user-authentication',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
    })
  })
);
