import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { ProfileLink, Skill } from '@/types';

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

let updateUserAbortController: AbortController | null = null;
export const updateUser = createAsyncThunk(
  'user/update',
  async (
    {
      phone,
      name,
      linkedin,
      github,
      twitter,
      portfolio,
      country,
      state,
      city,
      achievements,
      profile_links,
      onboarding_completed,
      skills,
      callback
    }: {
      phone?: string;
      name?: string;
      linkedin?: string;
      github?: string;
      twitter?: string;
      portfolio?: string;
      country?: string;
      state?: string;
      city?: string;
      achievements?: string[];
      profile_links?: ProfileLink[];
      onboarding_completed?: boolean;
      skills?: { name: string; type: Skill['type'] }[];
      callback?: Function;
    },
    { dispatch }
  ) => {
    if (updateUserAbortController) {
      updateUserAbortController.abort();
    }

    updateUserAbortController = new AbortController();

    const response = await Axios.put(
      '/user',
      {
        phone,
        name,
        linkedin,
        github,
        twitter,
        portfolio,
        country,
        state,
        city,
        achievements,
        onboarding_completed,
        profile_links,
        skills
      },
      {
        signal: updateUserAbortController.signal
      }
    );
    await dispatch(fetchSelf());
    callback?.();
    return response.data;
  }
);

export const socialLogin = createAsyncThunk(
  'user/social-login',
  async ({ name, email }: { name?: string | null; email?: string | null }) => {
    const response = await Axios.post('/user/social-login', { name, email });
    return response.data;
  }
);
