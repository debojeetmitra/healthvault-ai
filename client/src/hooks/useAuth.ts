import useAuthStore from "../store/auth.store";

/**
 * Convenience hook for consuming auth state in components.
 * Returns the most commonly needed auth values in a single destructure.
 */
export default function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const logout = useAuthStore((s) => s.logout);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    setUser,
    setToken,
    logout,
  };
}
