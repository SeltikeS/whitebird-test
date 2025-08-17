import { useAuth } from './useAuth.tsx';
import type { Permission } from '../types/permission.ts';

export const usePermission = () => {
  const { user } = useAuth();

  const hasPermission = (permission: Permission) => {
    if (!user) return false;

    return user.role?.permissions?.includes(permission);
  };

  return { hasPermission };
};
