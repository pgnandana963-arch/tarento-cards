import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../stores/authStore';

export function useAuth() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);
  const clearSession = useAuthStore((state) => state.clearSession);

  const isAuthenticated = !!token;

  const logout = () => {
    clearSession();
    queryClient.clear();
  };

  return { user, role, isAuthenticated, logout };
}