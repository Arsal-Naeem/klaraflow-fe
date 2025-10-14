import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '@/features/authentication/types';

const TOKEN_COOKIE_NAME = 'auth_token';
const USER_COOKIE_NAME = 'user_data';

/**
 * Server-side authentication utilities for use in Server Components and Server Actions
 */
export const serverAuth = {
  /**
   * Get the authentication token from cookies
   */
  getToken: async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_COOKIE_NAME)?.value || null;
  },

  /**
   * Get the current user from cookies
   */
  getUser: async (): Promise<User | null> => {
    const cookieStore = await cookies();
    const userData = cookieStore.get(USER_COOKIE_NAME)?.value;
    if (!userData) return null;
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await serverAuth.getToken();
    return !!token;
  },

  /**
   * Require authentication - redirects to login if not authenticated
   * Use this in Server Components that require authentication
   */
  requireAuth: async (): Promise<User> => {
    const user = await serverAuth.getUser();
    if (!user) {
      redirect('/login');
    }
    return user;
  },

  /**
   * Redirect to dashboard if authenticated
   * Use this in login/register pages
   */
  redirectIfAuthenticated: async (redirectTo: string = '/dashboard'): Promise<void> => {
    const isAuth = await serverAuth.isAuthenticated();
    if (isAuth) {
      redirect(redirectTo);
    }
  },
};

export default serverAuth;
