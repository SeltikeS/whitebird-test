import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../providers/useAuth.tsx';
import type { UserDto } from '../types/user-dto.ts';
import { authService } from '../api/authService.ts';
import { RoleName } from '../types/role.ts';

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: authUser, updateUser } = useAuth();

  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<UserDto>>({});

  const hasAdminPermissions = authUser?.role === RoleName.ADMIN;

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

  if (loading) return <CircularProgress />;

  if (!user || (!hasAdminPermissions && Number(userId) !== authUser?.id)) {
    return (
      <Typography variant="body1" color="text.secondary">
        User not found
      </Typography>
    );
  }

  const handleEditClick = () => {
    setForm(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({});
  };

  const handleSave = async () => {
    try {
      setUser(form as UserDto);
      if (Number(userId) === authUser.id) {
        updateUser(form);
      }
      setIsEditing(false);
    } catch (e) {
      console.error('Failed to update user', e);
    }
  };

  const updateField = (path: string, value: any) => {
    setForm((prev) => {
      const copy: any = structuredClone(prev);
      const keys = path.split('.');
      let obj = copy;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
      }

      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  return (
    <Stack spacing={2}>
      {isEditing ? (
        <>
          <TextField
            label="Name"
            value={form.name ?? ''}
            onChange={(e) => updateField('name', e.target.value)}
          />
          <TextField
            label="Username"
            value={form.username ?? ''}
            onChange={(e) => updateField('username', e.target.value)}
          />

          {/* Contacts */}
          <TextField
            label="Email"
            value={form.email ?? ''}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <TextField
            label="Phone"
            value={form.phone ?? ''}
            onChange={(e) => updateField('phone', e.target.value)}
          />
          <TextField
            label="Website"
            value={form.website ?? ''}
            onChange={(e) => updateField('website', e.target.value)}
          />

          {/* Address */}
          <Typography variant="h6">Address</Typography>
          <TextField
            label="Street"
            value={form.address?.street ?? ''}
            onChange={(e) => updateField('address.street', e.target.value)}
          />
          <TextField
            label="Suite"
            value={form.address?.suite ?? ''}
            onChange={(e) => updateField('address.suite', e.target.value)}
          />
          <TextField
            label="City"
            value={form.address?.city ?? ''}
            onChange={(e) => updateField('address.city', e.target.value)}
          />
          <TextField
            label="Zipcode"
            value={form.address?.zipcode ?? ''}
            onChange={(e) => updateField('address.zipcode', e.target.value)}
          />

          {/* Company */}
          <Typography variant="h6">Company</Typography>
          <TextField
            label="Company Name"
            value={form.company?.name ?? ''}
            onChange={(e) => updateField('company.name', e.target.value)}
          />
          <TextField
            label="Catch Phrase"
            value={form.company?.catchPhrase ?? ''}
            onChange={(e) => updateField('company.catchPhrase', e.target.value)}
          />
          <TextField
            label="BS"
            value={form.company?.bs ?? ''}
            onChange={(e) => updateField('company.bs', e.target.value)}
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Stack>
        </>
      ) : (
        <>
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

            <Stack>
              <Typography variant="h6">Company</Typography>
              <Typography>Name: {user.company.name}</Typography>
              <Typography>Catch Phrase: {user.company.catchPhrase}</Typography>
              <Typography>BS: {user.company.bs}</Typography>
            </Stack>
          </Stack>

          <Box mt={2}>
            <Button variant="outlined" onClick={handleEditClick}>
              Edit
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};
