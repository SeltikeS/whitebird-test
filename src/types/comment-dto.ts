export interface CommentDto {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentInfo extends CommentDto {
  likedByUserIds: number[];
  dislikedByUserIds: number[];
}
