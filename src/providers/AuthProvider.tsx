import { type ReactNode, useEffect, useState } from 'react';
import { authService } from '../api/authService.ts';
import { AuthContext } from '../context/AuthContext.tsx';
import type { UserDto } from '../types/user-dto.ts';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const me = await authService.me();
        if (isMounted) setUser(me);
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    await authService.login(email, password);
    const me = await authService.me();
    setUser(me);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (data: Partial<UserDto>) => {
    if (!user) return null;
    const me = await authService.me();
    const updated: UserDto = { ...me, ...data };
    setUser(updated as UserDto);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
