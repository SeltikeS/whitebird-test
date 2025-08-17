import axios from 'axios';
import type { PostDto } from '../types/./post-dto.ts';
import type { CommentDto } from '../types/comment-dto.ts';
import type { UserDto } from '../types/user-dto.ts';

// const API_URL = 'http://localhost:3000'; // твой бэкенд
//
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return { Authorization: `Bearer ${token}` };
// };
//
// export const postService = {
//   async getPosts(): Promise<PostDto[]> {
//     const res = await axios.get<PostDto[]>(`${API_URL}/posts`, {
//       headers: getAuthHeaders(),
//     });
//     return res.data;
//   },
//
//   async getPostById(id: number): Promise<PostDto> {
//     const res = await axios.get<PostDto>(`${API_URL}/posts/${id}`, {
//       headers: getAuthHeaders(),
//     });
//     return res.data;
//   },
//
//   async createPost(title: string, content: string): Promise<PostDto> {
//     const res = await axios.post<PostDto>(
//       `${API_URL}/posts`,
//       { title, content },
//       { headers: getAuthHeaders() }
//     );
//     return res.data;
//   },
//
//   async updatePost(
//     id: number,
//     data: { title?: string; content?: string; priority?: number }
//   ): Promise<PostDto> {
//     const res = await axios.patch<PostDto>(`${API_URL}/posts/${id}`, data, {
//       headers: getAuthHeaders(),
//     });
//     return res.data;
//   },
//
//   async deletePost(id: number): Promise<void> {
//     await axios.delete(`${API_URL}/posts/${id}`, { headers: getAuthHeaders() });
//   },
//
//   async likePost(id: number): Promise<PostDto> {
//     const res = await axios.patch<PostDto>(`${API_URL}/posts/${id}/like`, null, {
//       headers: getAuthHeaders(),
//     });
//     return res.data;
//   },
//
//   async dislikePost(id: number): Promise<PostDto> {
//     const res = await axios.patch<PostDto>(
//       `${API_URL}/posts/${id}/dislike`,
//       null,
//       {
//         headers: getAuthHeaders(),
//       }
//     );
//     return res.data;
//   },
//
//   async favoritePost(id: number): Promise<PostDto> {
//     const res = await axios.patch<PostDto>(
//       `${API_URL}/posts/${id}/favorite`,
//       null,
//       {
//         headers: getAuthHeaders(),
//       }
//     );
//     return res.data;
//   },
// };

const API_URL = 'https://jsonplaceholder.typicode.com';

export const postService = {
  async getPosts(): Promise<PostDto[]> {
    const res = await axios.get<PostDto[]>(`${API_URL}/posts`);
    return res.data;
  },

  async getPostById(postId: number): Promise<PostDto[]> {
    const res = await axios.get<PostDto[]>(`${API_URL}/posts/${postId}`);
    return res.data;
  },

  async createPost(
    title: string,
    body: string,
    user: UserDto
  ): Promise<PostDto> {
    const res = await axios.post<PostDto>(`${API_URL}/posts`, {
      title,
      body,
      userId: user?.id,
    });
    return res.data;
  },

  async editPost(
    postId: number,
    title: string,
    body: string,
    user: UserDto
  ): Promise<PostDto> {
    const res = await axios.put<PostDto>(`${API_URL}/posts/${postId}`, {
      title,
      body,
      userId: user?.id,
    });
    return res.data;
  },

  async deletePost(postId: number): Promise<PostDto> {
    const res = await axios.delete<PostDto>(`${API_URL}/posts/${postId}`);
    return res.data;
  },

  async getPostComments(postId: number): Promise<CommentDto[]> {
    const res = await axios.get<CommentDto[]>(
      `${API_URL}/posts/${postId}/comments`
    );
    return res.data;
  },
};
