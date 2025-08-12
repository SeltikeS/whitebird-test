import { Typography } from '@mui/material';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to MyForum
      </Typography>
      <Typography>
        This is the place to discuss topics and share ideas.
      </Typography>
    </div>
  );
};

export default Home;
