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
      <Box display="flex" flex="1">
        <Box component="main" flex="1" p={2}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
