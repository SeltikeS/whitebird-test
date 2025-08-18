import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import type { CommentInfo } from '../types/comment-dto.ts';
import React, { useCallback, useMemo } from 'react';
import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { useAuth } from '../providers/useAuth.tsx';
import { usePosts } from '../providers/usePosts.tsx';

interface CommentItemProps {
  postId: number;
  comment: CommentInfo;
}

export const CommentItem: React.FC<CommentItemProps> = React.memo(
  ({ postId, comment }) => {
    const { user } = useAuth();
    const { likeComment, dislikeComment } = usePosts();

    const isLiked = useMemo(
      () => (user ? comment.likedByUserIds.includes(user.id) : false),
      [comment, user]
    );
    const isDisliked = useMemo(
      () => (user ? comment.dislikedByUserIds.includes(user.id) : false),
      [comment, user]
    );

    const handleLike = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) likeComment(postId, comment.id, user.id);
      },
      [postId, comment.id, user, likeComment]
    );

    const handleDislike = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) dislikeComment(postId, comment.id, user.id);
      },
      [postId, comment.id, user, dislikeComment]
    );

    return (
      <Card>
        <CardContent>
          <Typography variant="subtitle2">{comment.name}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: 'pre-line' }}
          >
            {comment.body}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="like" onClick={handleLike}>
            {isLiked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
          </IconButton>
          <IconButton aria-label="dislike" onClick={handleDislike}>
            {isDisliked ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
          </IconButton>
        </CardActions>
      </Card>
    );
  },
  (prev, next) =>
    prev.comment.id === next.comment.id &&
    prev.comment.body === next.comment.body &&
    prev.comment.likedByUserIds === next.comment.likedByUserIds &&
    prev.comment.dislikedByUserIds === next.comment.dislikedByUserIds
);
