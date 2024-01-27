import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const fetchSkills = createAsyncThunk(
  'fetch/skills',
  async ({ query }: { query: string }) => {
    const response = await Axios.get('/skill', {
      params: {
        query
      }
    });
    return response.data;
  }
);
