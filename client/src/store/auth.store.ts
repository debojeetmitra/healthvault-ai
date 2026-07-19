import { create } from "zustand";
import type { AuthUser } from "../types/auth";

const TOKEN_KEY = "healthvault_token";

// ─── State Shape ──────────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // True once hydrate() has finished reading from localStorage.
  // Protected pages must wait for this before redirecting.
  isHydrated: boolean;
}

// ─── Actions Shape ────────────────────────────────────────────────────────────

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  hydrate: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: user !== null,
    }),

  // Persists token to localStorage alongside Zustand state
  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    set({ token });
  },

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      // isHydrated stays true — the app has already checked localStorage,
      // the user simply chose to log out.
      isHydrated: true,
    });
  },

  // Called once on app startup by AuthProvider.
  // Restores token from localStorage into Zustand state.
  // Does NOT call /auth/me — that is handled by AuthProvider.
  hydrate: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      set({ token, isHydrated: true });
    } else {
      // No token in storage — mark as hydrated so pages know
      // the check is complete and can redirect to login safely.
      set({ isHydrated: true });
    }
  },
}));

export default useAuthStore;
