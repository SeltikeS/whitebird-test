import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import type { CommentInfo } from '../types/comment-dto.ts';
import React, { useCallback, useMemo } from 'react';
import {
  Delete,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { useAuth } from '../providers/useAuth.tsx';
import { usePosts } from '../providers/usePosts.tsx';
import { RoleName } from '../types/role.ts';

interface CommentItemProps {
  postId: number;
  comment: CommentInfo;
}

export const CommentItem: React.FC<CommentItemProps> = React.memo(
  ({ postId, comment }) => {
    const { user } = useAuth();
    const { likeComment, dislikeComment, deleteComment } = usePosts();

    const hasAdminPermissions = user?.role === RoleName.ADMIN;

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

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) deleteComment(postId, comment.id);
      },
      [postId, comment.id, user, deleteComment]
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
          <Box flex={1} display="flex" justifyContent="space-between">
            <Box display="flex" gap={1}>
              <IconButton aria-label="like" onClick={handleLike}>
                {isLiked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
              </IconButton>
              <IconButton aria-label="dislike" onClick={handleDislike}>
                {isDisliked ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
              </IconButton>
            </Box>

            {hasAdminPermissions && (
              <IconButton aria-label="delete" onClick={handleDelete}>
                <Delete />
              </IconButton>
            )}
          </Box>
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
