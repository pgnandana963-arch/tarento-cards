import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../stores/authStore';
import type { AuthResponse, LoginCredentials } from '../types/auth';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        resolve({
          user: { id: 'admin-01', name: 'Admin User', email: credentials.email },
          role: 'admin',
          token: 'mock-jwt-token-12345',
        });
        return;
      }

      reject(new Error('Invalid credentials provided.'));
    }, 800);
  });
}

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      useAuthStore.getState().setSession(data.user, data.role, data.token);
    },
  });
}