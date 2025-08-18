import { Box, Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../providers/useAuth.tsx';
import { usePosts } from '../providers/usePosts.tsx';
import type { CommentInfo } from '../types/comment-dto.ts';

type CommentFormData = {
  body: string;
};

interface NewCommentFormProps {
  postId: number;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId }) => {
  const { user } = useAuth();
  const { posts, addComment } = usePosts();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<CommentFormData>({
    defaultValues: { body: '' },
    mode: 'onSubmit',
  });

  const onSubmit = (data: CommentFormData) => {
    if (!user) return;

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newComment: CommentInfo = {
      id: Date.now(), // временный ID
      postId,
      name: user.name,
      email: user.email,
      body: data.body,
      likedByUserIds: [],
      dislikedByUserIds: [],
    };

    addComment(postId, newComment);

    reset();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="body"
            control={control}
            rules={{ required: 'Comment cannot be empty' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Add a comment"
                multiline
                minRows={3}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
