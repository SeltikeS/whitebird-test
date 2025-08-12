import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate('/login');

  const handleHomeClick = () => navigate('/');

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleHomeClick}
        >
          WhiteBird Forum
        </Typography>
        <Button color="secondary" variant="outlined" onClick={handleLoginClick}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
