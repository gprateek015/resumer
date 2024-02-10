import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

let skillAbortController: AbortController | null = null;
export const fetchSkills = createAsyncThunk(
  'fetch/skills',
  async ({ query }: { query: string }) => {
    if (skillAbortController) skillAbortController.abort();

    skillAbortController = new AbortController();

    const response = await Axios.get('/skill', {
      params: {
        query
      },
      signal: skillAbortController.signal
    });
    return response.data;
  }
);
