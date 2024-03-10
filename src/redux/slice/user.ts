import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchSelf,
  loginUser,
  registerUser,
  socialLogin
} from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { Education, Experience, Project, User } from '@/types';
import {
  fetchEductions,
  postEducation,
  updateEducation
} from '@/actions/education';
import {
  fetchExperiences,
  postExperience,
  updateExperience
} from '@/actions/experience';
import { fetchProjects, postProject, updateProject } from '@/actions/project';

export type UserState = {
  authToken: string;
  data: User;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  error: string;
};

const initialState: UserState = {
  authToken: '',
  data: {},
  educations: [],
  experiences: [],
  projects: [],
  error: ''
};

const userDataToState = (state: UserState, action: PayloadAction<any>) => {
  state.data = action.payload?.user;
  if (action?.payload?.token) {
    state.authToken = action.payload?.token;
    localStorage.setItem(AUTH_TOKEN, action.payload?.token);
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.authToken = '';
      state.data = {};
    },
    addAuthToken: (state, action) => {
      state.authToken = action.payload || '';
    },
    clearError: state => {
      state.error = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        userDataToState(state, action);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        userDataToState(state, action);
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        userDataToState(state, action);
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        userDataToState(state, action);
      })
      .addCase(fetchEductions.fulfilled, (state, action) => {
        state.educations = action.payload.educations;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.experiences = action.payload.experiences;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
      })
      .addCase(postEducation.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      })
      .addCase(postExperience.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      })
      .addCase(postProject.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      });
  }
});

export const { clearUserData, addAuthToken, clearError } = userSlice.actions;

export default userSlice.reducer;
