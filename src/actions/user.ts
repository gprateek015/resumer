import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await Axios.post('/user/login', { email, password });
    return response.data;
  }
);
