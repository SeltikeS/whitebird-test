import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 WhiteBird Forum
      </Typography>
    </Box>
  );
};

export default Footer;
