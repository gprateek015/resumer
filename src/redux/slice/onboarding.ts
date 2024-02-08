import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSelf, loginUser, registerUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { generateResumeData, loadResume, uploadResume } from '@/actions/resume';
import { User, Experience, Project, Education, ProfileLink } from '@/types';
import { fetchExperiences, postExperience } from '@/actions/experience';
import { fetchEductions, postEducation } from '@/actions/education';
import { fetchProjects, postProject } from '@/actions/project';

export type InitialState = {
  experiences: Experience[];
  projects: Project[];
  educations: Education[];
  errors: any;
  codingProfiles: ProfileLink[];
  resumeParseCompleted: boolean;
};

const initialState: InitialState = {
  experiences: [],
  educations: [],
  projects: [],
  errors: null,
  codingProfiles: [],
  resumeParseCompleted: false
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    clearOnboardingErrors: state => {
      state.errors = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.experiences = action.payload?.user?.experiences;
        state.educations = action.payload?.user?.educations;
        state.projects = action.payload?.user?.projects;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.experiences = action.payload?.user?.experiences;
        state.educations = action.payload?.user?.educations;
        state.projects = action.payload?.user?.projects;
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.experiences = action.payload?.user?.experiences;
        state.educations = action.payload?.user?.educations;
        state.projects = action.payload?.user?.projects;
        state.codingProfiles = action.payload?.user?.profile_links;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.experiences = action?.payload?.experiences;
      })
      .addCase(fetchEductions.fulfilled, (state, action) => {
        state.educations = action?.payload?.educations;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action?.payload?.projects;
      })
      .addCase(postExperience.rejected, (state, action) => {
        try {
          state.errors = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.errors = action?.error?.message;
        }
      })
      .addCase(postEducation.rejected, (state, action) => {
        try {
          state.errors = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.errors = action?.error?.message;
        }
      })
      .addCase(postProject.rejected, (state, action) => {
        try {
          state.errors = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.errors = action?.error?.message;
        }
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.resumeParseCompleted = action.payload.success;
      });
  }
});

export const { clearOnboardingErrors } = onboardingSlice.actions;

export default onboardingSlice.reducer;
