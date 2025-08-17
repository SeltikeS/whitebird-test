export interface PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostInfo extends PostDto {}
