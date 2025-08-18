import type { UserDto } from '../types/user-dto.ts';
import axios from 'axios';
import { RoleName } from '../types/role.ts';

// const API_URL = 'http://localhost:3000'; // твой бэкенд
//
// export const authService = {
//   async login(email: string, password: string) {
//     const res = await axios.post(`${API_URL}/auth/login`, { email, password });
//     localStorage.setItem('token', res.data.access_token);
//     return res.data;
//   },
//
//   async me() {
//     const token = localStorage.getItem('token');
//     if (!token) throw new Error('No token');
//
//     const res = await axios.get(`${API_URL}/auth/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   },
//
//   logout() {
//     localStorage.removeItem('token');
//   },
// };

const API_URL = 'https://jsonplaceholder.typicode.com';

export const authService = {
  async getUsers(): Promise<UserDto[]> {
    const res = await axios.get<UserDto[]>(`${API_URL}/users`);
    return res.data;
  },

  async getUserById(userId: number): Promise<UserDto | null> {
    const users = await this.getUsers();
    return users?.find((u) => u.id === userId) ?? null;
  },

  async login(email: string, password: string): Promise<UserDto> {
    const users = await this.getUsers();
    let user: UserDto;
    if (password.startsWith('admin')) {
      user = {
        ...users[0],
        email,
        role: RoleName.ADMIN,
      };
    } else {
      user = {
        ...users[1],
        email,
        role: RoleName.USER,
      };
    }

    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async me(): Promise<UserDto> {
    const user = localStorage.getItem('user');
    if (!user) throw new Error('No user logged in');
    return JSON.parse(user) as UserDto;
  },

  logout() {
    localStorage.removeItem('user');
  },
};
