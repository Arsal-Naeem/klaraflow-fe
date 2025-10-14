import { useUserStore } from '@/stores/user-store';

/**
 * Hook to access current user data from the store
 * This is a convenience hook that provides a cleaner API
 */
export function useCurrentUser() {
  const { user, setUser, updateUser, clearUser, isHydrated } = useUserStore();

  // Helper function to get user's full name
  const getFullName = () => {
    if (!user) return '';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return `${firstName} ${lastName}`.trim() || user.email.split('@')[0];
  };

  // Helper function to get user initials
  const getInitials = () => {
    if (!user) return 'U';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return (firstName[0] || lastName[0] || user.email[0]).toUpperCase();
  };

  return {
    user,
    setUser,
    updateUser,
    clearUser,
    isHydrated,
    fullName: getFullName(),
    initials: getInitials(),
    isLoaded: isHydrated && !!user,
  };
}
