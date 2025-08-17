import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';
import type { PostDto } from '../types/./post-dto.ts';
import { useNavigate } from 'react-router-dom';

interface PostItemProps {
  post: PostDto;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/posts/${post.id}`)}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
