import type { PostInfo } from '../types/post-dto.ts';
import React from 'react';
import { Stack } from '@mui/material';
import { PostItem } from './PostItem.tsx';

export const PostsList: React.FC<{ posts: PostInfo[] }> = React.memo(
  ({ posts }) => {
    return (
      <Stack spacing={3}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Stack>
    );
  }
);
