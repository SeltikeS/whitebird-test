import type { CommentInfo } from '../types/comment-dto.ts';
import { Stack, Typography } from '@mui/material';
import { CommentItem } from './CommentItem.tsx';
import React, { useMemo } from 'react';

interface CommentsListProps {
  postId: number;
  comments: CommentInfo[];
  loading: boolean;
  loaded: boolean;
}

export const CommentsList: React.FC<CommentsListProps> = React.memo(
  ({ postId, comments }) => {
    const items = useMemo(() => {
      if (!comments || comments.length === 0) return null;
      return comments.map((comment) => (
        <CommentItem key={comment.id} postId={postId} comment={comment} />
      ));
    }, [comments, postId]);

    if (!comments || comments.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      );
    }

    return <Stack spacing={2}>{items}</Stack>;
  }
);
