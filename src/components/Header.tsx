import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/useAuth.tsx';
import { usePermission } from '../providers/usePermission.tsx';
import { Permission } from '../types/permission.ts';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { hasPermission } = usePermission();

  if (!user) return;

  const handleHomeClick = () => navigate('/');
  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };
  const handleProfileClick = () => navigate(`/profile/${user.id}`);
  const handleAdminClick = () => navigate('/admin');

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={handleHomeClick}
          >
            WhiteBird Forum
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{' '}
          {isAuthenticated && (
            <>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleProfileClick}
                sx={{ mr: 1 }}
              >
                Profile
              </Button>

              {hasPermission(Permission.MANAGE_USERS) && (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleAdminClick}
                  sx={{ mr: 1 }}
                >
                  Admin
                </Button>
              )}

              <Button
                color="secondary"
                variant="outlined"
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
