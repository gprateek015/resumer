import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const postReview = createAsyncThunk(
  'post/review',
  async ({ description }: { description: string }) => {
    const response = await Axios.post('/review', { description });
    return response.data;
  }
);
