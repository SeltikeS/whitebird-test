import { postService } from '../api/postService.ts';
import { usePosts } from '../providers/usePosts.tsx';
import { useAuth } from '../providers/useAuth.tsx';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type PostFormData = {
  title: string;
  body: string;
};

export const NewPostForm: React.FC = () => {
  const { user } = useAuth();
  const { addPost } = usePosts();

  const emptyForm = { title: '', body: '' };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<PostFormData>({
    defaultValues: emptyForm,
    mode: 'onSubmit',
  });

  const onSubmit = async (data: PostFormData) => {
    if (!user) return;
    const post = await postService.createPost(data.title, data.body, user);
    addPost({
      ...post,
      comments: [],
      dislikedByUserIds: [],
      likedByUserIds: [],
      isFavourite: false,
      priority: 0,
    });
    reset(emptyForm);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Create a new post
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: 'Title is required',
              maxLength: { value: 100, message: 'Maximum 100 characters' },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                autoFocus
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            rules={{
              required: 'Body is required',
              maxLength: { value: 300, message: 'Maximum 300 characters' },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Body"
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
