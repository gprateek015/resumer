import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';
import { Resume } from '@/types';

type ResumeLoadType =
  | Resume
  | {
      technical_skills?: string[];
      core_subjects?: string[];
      dev_tools?: string[];
      languages?: string[];
    };

export const loadResume = createAsyncThunk(
  'load/resume',
  async ({
    resumeData,
    templateId
  }: {
    resumeData: ResumeLoadType;
    templateId: number;
  }) => {
    const response = await Axios.post(
      `/resume/engineering/${templateId}/load`,
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
