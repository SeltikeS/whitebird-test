import type { PostInfo } from '../types/post-dto.ts';
import { createContext } from 'react';
import type { CommentInfo } from '../types/comment-dto.ts';

export interface PostsContextValue {
  posts: PostInfo[];
  loadingPosts: boolean;
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  addPost: (post: PostInfo) => void;
  updatePost: (post: PostInfo) => void;
  removePost: (postId: number) => void;
  likePost: (postId: number, currentUserId: number) => void;
  dislikePost: (postId: number, currentUserId: number) => void;
  setPostComments: (postId: number, comments: CommentInfo[]) => void;
  addComment: (postId: number, comment: CommentInfo) => void;
  editComment: (
    postId: number,
    commentId: number,
    newComment: Partial<CommentInfo>
  ) => void;
  deleteComment: (postId: number, commentId: number) => void;
  likeComment: (
    postId: number,
    commentId: number,
    currentUserId: number
  ) => void;
  dislikeComment: (
    postId: number,
    commentId: number,
    currentUserId: number
  ) => void;
}

export const PostsContext = createContext<PostsContextValue | undefined>(
  undefined
);
