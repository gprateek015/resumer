import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchSelf,
  loginUser,
  registerUser,
  socialLogin,
  updateUser
} from '@/actions/user';
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
  data: User;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  error: string;
  isBugDialogOpen: boolean;
  apiPending: boolean;
  apiSuccessfull: boolean;
  apiFailed: boolean;
};

const initialState: UserState = {
  data: {},
  educations: [],
  experiences: [],
  projects: [],
  error: '',
  isBugDialogOpen: false,
  apiPending: false,
  apiSuccessfull: false,
  apiFailed: false
};

const userDataToState = (state: UserState, action: PayloadAction<any>) => {
  state.data = action.payload?.user;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.data = {};
    },
    clearError: state => {
      state.error = '';
    },
    openBugDialog: state => {
      state.isBugDialogOpen = true;
    },
    closeBugDialog: state => {
      state.isBugDialogOpen = false;
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
      .addCase(updateUser.pending, state => {
        state.apiPending = true;
        state.apiFailed = false;
        state.apiSuccessfull = false;
      })
      .addCase(updateUser.fulfilled, state => {
        state.apiPending = false;
        state.apiFailed = false;
        state.apiSuccessfull = true;
      })
      .addCase(updateUser.rejected, state => {
        state.apiPending = false;
        state.apiFailed = true;
        state.apiSuccessfull = false;
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

export const {
  clearUserData,
  clearError,
  openBugDialog,
  closeBugDialog
} = userSlice.actions;

export default userSlice.reducer;
