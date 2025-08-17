import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth.tsx';
import { usePermission } from '../../providers/usePermission.tsx';
import { Permission } from '../../types/permission.ts';
import { Box, CircularProgress } from '@mui/material';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { hasPermission } = usePermission();

  if (loading) {
    return (
      <Box
        sx={{ flex: 1, display: 'grid', placeItems: 'center', height: '100%' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !hasPermission(Permission.MANAGE_USERS)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
