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

export const generateResumeData = createAsyncThunk(
  'generate/resume',
  async ({ jobDescription }: { jobDescription: string }) => {
    const response = await Axios.post(
      `/resume/data-new?rewrite=${!!jobDescription.length}`,
      { job_description: jobDescription }
    );
    return response.data;
  }
);
