import { Navigate } from 'react-router-dom';
import { type JSX } from 'react';
import { useAuth } from '../../providers/useAuth.tsx';
import { Box, CircularProgress } from '@mui/material';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{ flex: 1, display: 'grid', placeItems: 'center', height: '100%' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};
