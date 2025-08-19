import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth.tsx';
import { Box, CircularProgress } from '@mui/material';
import { RoleName } from '../../types/role.ts';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const hasAdminPermissions = user?.role === RoleName.ADMIN;

  if (loading) {
    return (
      <Box
        sx={{ flex: 1, display: 'grid', placeItems: 'center', height: '100%' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !hasAdminPermissions) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
