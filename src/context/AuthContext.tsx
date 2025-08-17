import { createContext } from 'react';
import type { UserDto } from '../types/user-dto.ts';

export interface AuthContextProps {
  user: UserDto | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
