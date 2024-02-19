import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { Education } from '@/types';
import { RootState } from '@/redux/store';
import axios from 'axios';

export const fetchEductions = createAsyncThunk('fetch/education', async () => {
  const response = await Axios.get('/education');
  return response.data;
});

export const postEducation = createAsyncThunk(
  'post/education',
  async (data: Education, { dispatch }) => {
    const response = await Axios.post('/education', data);
    await dispatch(fetchEductions());
    return response.data;
  }
);

export const updateEducation = createAsyncThunk(
  'update/education',
  async ({ data, id }: { data: Education; id: string }, { dispatch }) => {
    const response = await Axios.put(`/education/${id}`, data);
    await dispatch(fetchEductions());
    return response.data;
  }
);

export const deleteEducation = createAsyncThunk(
  'delete/education',
  async (id: string, { dispatch }) => {
    const response = await Axios.delete(`/education/${id}`);
    await dispatch(fetchEductions());
    return response.data;
  }
);
