import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSelf, loginUser, registerUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { generateResumeData, loadResume } from '@/actions/resume';
import { User } from '@/types';

export type UserState = {
  authToken: string;
  data: User;
  resumeData: any;
  pdfUrl: string | undefined;
};

const initialState: UserState = {
  authToken: '',
  data: {},
  resumeData: {},
  pdfUrl: undefined
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
    setResumeData: (state, action) => {
      state.resumeData = action?.payload || {};
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
      .addCase(loadResume.fulfilled, (state, action) => {
        state.pdfUrl = action.payload;
      })
      .addCase(generateResumeData.fulfilled, (state, action) => {
        state.resumeData = action.payload;
      });
  }
});

export const { clearUserData, setResumeData, addAuthToken } = userSlice.actions;

export default userSlice.reducer;
