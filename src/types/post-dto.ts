import type { CommentInfo } from './comment-dto.ts';

export interface PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostInfo extends PostDto {
  likedByUserIds: number[];
  dislikedByUserIds: number[];
  comments: CommentInfo[];
  isFavourite: boolean;
  priority: number;
}
