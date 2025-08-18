import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import type { PostInfo } from '../types/./post-dto.ts';
import { useNavigate } from 'react-router-dom';
import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { usePosts } from '../providers/usePosts.tsx';
import { useAuth } from '../providers/useAuth.tsx';

interface PostItemProps {
  post: PostInfo;
}

export const PostItem: React.FC<PostItemProps> = React.memo(
  ({ post }) => {
    const navigate = useNavigate();
    const { posts, likePost, dislikePost } = usePosts();
    const { user } = useAuth();

    const postFromStore = useMemo(
      () => posts.find((p) => p.id === post.id),
      [posts, post.id]
    );

    const isLiked = useMemo(
      () => (user ? postFromStore?.likedByUserIds.includes(user.id) : false),
      [postFromStore, user]
    );

    const isDisliked = useMemo(
      () => (user ? postFromStore?.dislikedByUserIds.includes(user.id) : false),
      [postFromStore, user]
    );

    const handleLike = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) likePost(post.id, user.id);
      },
      [post.id, user, likePost]
    );

    const handleDislike = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) dislikePost(post.id, user.id);
      },
      [post.id, user, dislikePost]
    );

    return (
      <Card>
        <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
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
  (prev, next) => {
    const prevPost = prev.post;
    const nextPost = next.post;

    const likedEqual =
      prevPost.likedByUserIds === nextPost.likedByUserIds ||
      (prevPost.likedByUserIds.length === nextPost.likedByUserIds.length &&
        prevPost.likedByUserIds.every(
          (id, i) => id === nextPost.likedByUserIds[i]
        ));

    const dislikedEqual =
      prevPost.dislikedByUserIds === nextPost.dislikedByUserIds ||
      (prevPost.dislikedByUserIds.length ===
        nextPost.dislikedByUserIds.length &&
        prevPost.dislikedByUserIds.every(
          (id, i) => id === nextPost.dislikedByUserIds[i]
        ));

    return prevPost.id === nextPost.id && likedEqual && dislikedEqual;
  }
);
