import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

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
