import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { Resume } from '@/types';

export const loadResume = createAsyncThunk(
  'load/resume',
  async ({ resumeData }: { resumeData: Resume }) => {
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

export const uploadResume = createAsyncThunk(
  'upload/resume',
  async ({ formData }: { formData: FormData }) => {
    const response = await Axios.post('/resume/parse-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
);
