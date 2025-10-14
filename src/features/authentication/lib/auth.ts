import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { User } from '@/features/authentication/types';

// Cookie configuration
const TOKEN_COOKIE_NAME = 'auth_token';
const USER_COOKIE_NAME = 'user_data';

const COOKIE_OPTIONS = {
  httpOnly: false, // Set to false so we can read it client-side for API calls
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

// Client-side cookie utilities (for client components)
export const clientAuth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return getCookie(TOKEN_COOKIE_NAME) as string || null;
  },

  setToken: (token: string): void => {
    setCookie(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
  },

  removeToken: (): void => {
    deleteCookie(TOKEN_COOKIE_NAME);
    deleteCookie(USER_COOKIE_NAME);
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userData = getCookie(USER_COOKIE_NAME);
    if (!userData) return null;
    try {
      return JSON.parse(userData as string);
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    setCookie(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_OPTIONS);
  },

  isAuthenticated: (): boolean => {
    return !!clientAuth.getToken();
  },
};

export default clientAuth;
