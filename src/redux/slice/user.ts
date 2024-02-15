import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchSelf,
  loginUser,
  registerUser,
  socialLogin
} from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { generateResumeData, loadResume } from '@/actions/resume';
import { Education, Experience, Project, User } from '@/types';
import { fetchEductions } from '@/actions/education';
import { fetchExperiences } from '@/actions/experience';
import { fetchProjects } from '@/actions/project';

export type UserState = {
  authToken: string;
  data: User;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
};

const initialState: UserState = {
  authToken: '',
  data: {},
  educations: [],
  experiences: [],
  projects: []
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
      });
  }
});

export const { clearUserData, addAuthToken } = userSlice.actions;

export default userSlice.reducer;
