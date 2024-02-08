import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchSelf,
  loginUser,
  registerUser,
  socialLogin
} from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { generateResumeData, loadResume } from '@/actions/resume';
import { User } from '@/types';

export type UserState = {
  authToken: string;
  data: User;
};

const initialState: UserState = {
  authToken: '',
  data: {}
};

const userDataToState = (state: UserState, action: PayloadAction<any>) => {
  state.data = action.payload?.user;
  if (!state.authToken && action?.payload?.token) {
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
      });
  }
});

export const { clearUserData, addAuthToken } = userSlice.actions;

export default userSlice.reducer;
