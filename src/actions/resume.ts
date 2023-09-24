import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const loadResume = createAsyncThunk(
  'load/resume',
  async ({ resumeData }: { resumeData: any }) => {
    const response = await Axios.post(
      '/resume/engineering/0/load',
      resumeData,
      {
        responseType: 'arraybuffer'
      }
    );
    return response.data;
  }
);
