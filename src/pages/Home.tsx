import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { usePosts } from '../providers/usePosts.tsx';
import { PostsList } from '../components/PostsList.tsx';
import { NewPostForm } from '../components/NewPostForm.tsx';

const Home: React.FC = () => {
  const { posts, loadingPosts } = usePosts();

  if (loadingPosts)
    return (
      <Box
        sx={{
          flex: '1',
          display: 'grid',
          placeItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <NewPostForm />

      {posts.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No posts yet.
        </Typography>
      ) : (
        <PostsList posts={posts} />
      )}
    </Box>
  );
};

export default Home;
