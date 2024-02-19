import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { Project } from '@/types';
import { RootState } from '@/redux/store';

export const fetchProjects = createAsyncThunk('fetch/project', async () => {
  const response = await Axios.get('/project');
  return response.data;
});

export const postProject = createAsyncThunk(
  'post/project',
  async (data: Project, { dispatch }) => {
    const response = await Axios.post('/project', data);
    await dispatch(fetchProjects());
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  'update/project',
  async ({ data, id }: { data: Project; id: string }, { dispatch }) => {
    const response = await Axios.put(`/project/${id}`, data);
    await dispatch(fetchProjects());
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'delete/project',
  async (id: string, { dispatch }) => {
    const response = await Axios.delete(`/project/${id}`);
    await dispatch(fetchProjects());
    return response.data;
  }
);
