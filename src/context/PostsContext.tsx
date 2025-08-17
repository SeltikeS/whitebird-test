import type { PostInfo } from '../types/post-dto.ts';
import { createContext } from 'react';

export interface PostsContextValue {
  posts: PostInfo[];
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  addPost: (post: PostInfo) => void;
  updatePost: (post: PostInfo) => void;
  removePost: (postId: number) => void;
  loadingPosts: boolean;
}

export const PostsContext = createContext<PostsContextValue | undefined>(
  undefined
);
