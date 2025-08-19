import { Box } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Header />

      <Box
        flex="1"
        sx={{
          display: 'flex',
          position: 'relative',
        }}
      >
        <Box
          component="main"
          flex="1"
          p={2}
          sx={{
            position: 'absolute',
            inset: '0',
            overflow: 'auto',
            scrollbarGutter: 'stable',
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
