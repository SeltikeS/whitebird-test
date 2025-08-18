import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../providers/useAuth.tsx';
import type { UserDto } from '../types/user-dto.ts';
import { authService } from '../api/authService.ts';

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: authUser } = useAuth();

  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const id = Number(userId);

    if (authUser && id === authUser.id) {
      setUser(authUser);
      return;
    }

    setLoading(true);
    authService
      .getUserById(id)
      .then((user) => setUser(user))
      .finally(() => setLoading(false));
  }, [userId, authUser]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return (
      <Typography variant="body1" color="text.secondary">
        User not found
      </Typography>
    );
  }

  return (
    <Stack>
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        @{user.username}
      </Typography>

      <Stack spacing={1} mt={2}>
        <Stack>
          <Typography variant="h6">Contacts</Typography>

          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Website: {user.website}</Typography>
        </Stack>

        <Stack>
          <Typography variant="h6">Address</Typography>

          <Typography>
            {user.address.street}, {user.address.suite}
          </Typography>
          <Typography>
            {user.address.city}, {user.address.zipcode}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
