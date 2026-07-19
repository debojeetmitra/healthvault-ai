"use client";

import { useEffect } from "react";
import useAuthStore from "../store/auth.store";
import { getMe } from "../services/auth.service";

/**
 * AuthProvider — wraps the app and handles authentication hydration on load.
 *
 * Flow:
 * 1. Reads token from localStorage into Zustand (hydrate).
 * 2. If a token exists, calls GET /auth/me to fetch the user profile.
 * 3. If /auth/me succeeds, populates user in the store.
 * 4. If /auth/me fails (expired/invalid token), clears auth state.
 *
 * This component renders children immediately — it does NOT block rendering.
 * Pages that require auth should check isLoading / isAuthenticated themselves.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const logout = useAuthStore((s) => s.logout);

  // Step 1: Restore token from localStorage into Zustand
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Step 2: If token exists, fetch the user profile
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const { user } = await getMe();
        setUser(user);
      } catch {
        // Token is invalid or expired — clean up
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, setUser, setLoading, logout]);

  return <>{children}</>;
}
