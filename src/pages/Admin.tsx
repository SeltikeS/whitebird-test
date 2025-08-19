import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { UserDto } from '../types/user-dto.ts';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService.ts';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authService.getUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/profile/${user.id}`)}>
              <ListItemText
                primary={user.name}
                secondary={`@${user.username}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Admin;
