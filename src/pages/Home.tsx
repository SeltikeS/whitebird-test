import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import { usePosts } from '../providers/usePosts.tsx';
import { PostsList } from '../components/PostsList.tsx';
import { NewPostForm } from '../components/NewPostForm.tsx';
import type { UserDto } from '../types/user-dto.ts';
import { authService } from '../api/authService.ts';

const Home: React.FC = () => {
  const { posts, loadingPosts } = usePosts();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0); // 0 = все пользователи
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const data = await authService.getUsers();
        if (isMounted) setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        if (isMounted) setLoadingUsers(false);
      }
    };
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserId(Number(event.target.value));
  };

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedUserId !== 0) {
      filtered = filtered.filter((p) => p.userId === selectedUserId);
    }

    if (showFavouritesOnly) {
      filtered = filtered.filter((p) => p.isFavourite);
    }

    return filtered;
  }, [posts, selectedUserId, showFavouritesOnly]);

  if (loadingPosts || loadingUsers)
    return (
      <Box
        sx={{
          flex: '1',
          display: 'grid',
          placeItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <NewPostForm />

      <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Select value={selectedUserId.toString()} onChange={handleUserChange}>
          <MenuItem value={0}>All Users</MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          control={
            <Checkbox
              checked={showFavouritesOnly}
              onChange={(e) => setShowFavouritesOnly(e.target.checked)}
            />
          }
          label="Only Favourites"
        />
      </Box>

      {filteredPosts.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No posts yet.
        </Typography>
      ) : (
        <PostsList posts={filteredPosts} />
      )}
    </Box>
  );
};

export default Home;
