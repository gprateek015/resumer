import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { Experience } from '@/types';
import { RootState } from '@/redux/store';

export const fetchExperiences = createAsyncThunk(
  'fetch/experience',
  async () => {
    const response = await Axios.get('/experience');
    return response.data;
  }
);

export const postExperience = createAsyncThunk(
  'post/experience',
  async (data: Experience, { dispatch }) => {
    const response = await Axios.post('/experience', data);
    await dispatch(fetchExperiences());
    return response.data;
  }
);

export const updateExperience = createAsyncThunk(
  'update/experience',
  async ({ data, id }: { data: Experience; id: string }, { dispatch }) => {
    const response = await Axios.put(`/experience/${id}`, data);
    await dispatch(fetchExperiences());
    return response.data;
  }
);

export const deleteExperience = createAsyncThunk(
  'delete/experience',
  async (id: string, { dispatch }) => {
    const response = await Axios.delete(`/experience/${id}`);
    await dispatch(fetchExperiences());
    return response.data;
  }
);
