import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Box, Button, TextField } from '@mui/material';
import type { PostInfo } from '../types/post-dto.ts';

interface EditablePostFormProps {
  post: PostInfo;
  onSave: (updatedPost: Partial<PostInfo>) => void;
  onCancel: () => void;
}

interface FormValues {
  title: string;
  body: string;
}

export const EditablePostForm: React.FC<EditablePostFormProps> = ({
  post,
  onSave,
  onCancel,
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      onSave({ ...post, ...data });
    },
    [onSave, post]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField fullWidth label="Title" {...field} />}
      />
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <TextField fullWidth multiline minRows={4} label="Body" {...field} />
        )}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
