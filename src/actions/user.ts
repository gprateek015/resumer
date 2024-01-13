import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { ProfileLink } from '@/types';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await Axios.post('/user/login', { email, password });
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({
    email,
    password,
    first_name,
    last_name
  }: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const response = await Axios.post('/user', {
      name: first_name + ' ' + last_name,
      email,
      password
    });
    return response.data;
  }
);

export const fetchSelf = createAsyncThunk('user/self', async () => {
  const response = await Axios.get('/user');
  return response.data;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    {
      phone,
      linkedin,
      github,
      twitter,
      portfolio,
      country,
      state,
      city,
      profile_links,
      onboarding_completed,
      callback
    }: {
      phone?: string;
      linkedin?: string;
      github?: string;
      twitter?: string;
      portfolio?: string;
      country?: string;
      state?: string;
      city?: string;
      profile_links: ProfileLink[];
      onboarding_completed?: boolean;
      callback?: Function;
    },
    { dispatch }
  ) => {
    const response = await Axios.put('/user', {
      phone,
      linkedin,
      github,
      twitter,
      portfolio,
      country,
      state,
      city,
      onboarding_completed,
      profile_links
    });
    await dispatch(fetchSelf());
    callback?.();
    return response.data;
  }
);
