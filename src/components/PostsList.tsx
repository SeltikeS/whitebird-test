import type { PostInfo } from '../types/post-dto.ts';
import React, { useMemo } from 'react';
import { Stack } from '@mui/material';
import { PostItem } from './PostItem.tsx';

export const PostsList: React.FC<{ posts: PostInfo[] }> = React.memo(
  ({ posts }) => {
    const items = useMemo(
      () => posts.map((post) => <PostItem key={post.id} post={post} />),
      [posts]
    );

    return <Stack spacing={3}>{items}</Stack>;
  }
);
