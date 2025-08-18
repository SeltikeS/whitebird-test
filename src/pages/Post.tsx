import React, { useCallback, useMemo, useState } from 'react';
import { usePosts } from '../providers/usePosts.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useAuth } from '../providers/useAuth.tsx';
import {
  Delete,
  ModeEdit,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import { CommentsBlock } from '../components/CommentsBlock.tsx';
import { EditablePostForm } from '../components/EditablePostForm.tsx';
import type { PostInfo } from '../types/post-dto.ts';

const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts, likePost, dislikePost, loadingPosts, removePost, updatePost } =
    usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const id = Number(postId);

  const post = useMemo(() => posts.find((p) => p.id === id), [posts, id]);
  const isMyPost = user?.id === post?.userId;

  const isLiked = useMemo(
    () => (user ? post?.likedByUserIds.includes(user.id) : false),
    [post, user]
  );
  const isDisliked = useMemo(
    () => (user ? post?.dislikedByUserIds.includes(user.id) : false),
    [post, user]
  );

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (user) likePost(id, user.id);
    },
    [id, user, likePost]
  );

  const handleDislike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (user) dislikePost(id, user.id);
    },
    [id, user, dislikePost]
  );

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!postId) return;
      removePost(+postId);
      navigate(`/`);
    },
    [postId, removePost, navigate]
  );

  if (loadingPosts) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mt: 4, textAlign: 'center' }}
      >
        Post not found
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {isEditing ? (
        <EditablePostForm
          post={post}
          onSave={(updatedPost) => {
            updatePost(updatedPost as PostInfo);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Box>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {post.body}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <IconButton aria-label="like" onClick={handleLike}>
                {isLiked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
              </IconButton>
              <IconButton aria-label="dislike" onClick={handleDislike}>
                {isDisliked ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
              </IconButton>
            </Box>

            {isMyPost && (
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <ModeEdit />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Box>

          <CommentsBlock postId={id} />
        </>
      )}
    </Box>
  );
};

export default Post;
