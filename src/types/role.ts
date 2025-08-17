import type { Permission } from './permission.ts';

export const RoleName = {
  USER: 'user',
  ADMIN: 'admin',
} as const;
export type RoleName = (typeof RoleName)[keyof typeof RoleName];

export interface Role {
  id: number;
  name: RoleName;
  permissions: Permission[];
}
