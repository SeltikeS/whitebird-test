import { usePosts } from '../providers/usePosts.tsx';
import { Box, CircularProgress, Typography } from '@mui/material';
import { NewCommentForm } from './NewCommentForm.tsx';
import { useEffect, useState } from 'react';
import { postService } from '../api/postService.ts';
import { CommentsList } from './CommentsList.tsx';
import type { CommentInfo } from '../types/comment-dto.ts';

interface CommentsBlockProps {
  postId: number;
}

export const CommentsBlock: React.FC<CommentsBlockProps> = ({ postId }) => {
  const { posts, updatePost, setPostComments } = usePosts();
  const post = posts.find((p) => p.id === postId);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!post || loaded) return;

    if (post.comments?.length) {
      setLoaded(true);
      return;
    }

    setLoading(true);
    postService
      .getPostComments(postId)
      .then((comments) => {
        const commentsInfo: CommentInfo[] = comments.map((comment) => ({
          ...comment,
          likedByUserIds: [],
          dislikedByUserIds: [],
        }));
        setPostComments(postId, commentsInfo);
      })
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  }, [post, postId, updatePost]);

  if (!post) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Comments ({post.comments?.length ?? 0})
      </Typography>

      <NewCommentForm postId={postId} />

      {loading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <CommentsList
            postId={postId}
            comments={post.comments ?? []}
            loading={loading}
            loaded={loaded}
          />
        </Box>
      )}
    </Box>
  );
};
