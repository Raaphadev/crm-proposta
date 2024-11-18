import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as jose from 'jose';
import { mockLogin } from '../services/mockAuth';
import type { User } from '../../../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const { user, token } = await mockLogin(credentials.email, credentials.password);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { token, logout } = get();
        if (!token) return false;

        try {
          const payload = JSON.parse(atob(token));
          const isValid = payload.exp > Date.now();
          if (!isValid) {
            logout();
          }
          return isValid;
        } catch {
          logout();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);