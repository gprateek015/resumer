import { createSlice } from '@reduxjs/toolkit';
import { fetchSelf, loginUser, registerUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';
import { generateResumeData, loadResume } from '@/actions/resume';

const initialState = {
  authAoken: '',
  data: {},
  resumeData: {},
  pdfUrl: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.authAoken = '';
      state.data = {};
    },
    setResumeData: (state, action) => {
      state.resumeData = action?.payload || {};
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload?.user;
        state.authAoken = action.payload?.token;
        localStorage.setItem(AUTH_TOKEN, action.payload?.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload?.user;
        state.authAoken = action.payload?.token;
        localStorage.setItem(AUTH_TOKEN, action.payload?.token);
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.data = action.payload?.user;
      })
      .addCase(loadResume.fulfilled, (state, action) => {
        state.pdfUrl = action.payload;
      })
      .addCase(generateResumeData.fulfilled, (state, action) => {
        state.resumeData = action.payload;
      });
  }
});

export const { clearUserData, setResumeData } = userSlice.actions;

export default userSlice.reducer;
