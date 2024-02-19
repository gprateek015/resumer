import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSelf,
  loginUser,
  registerUser,
  sendOtp,
  socialLogin,
  verifyOtp
} from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';

const initialState = {
  isLoggedIn: false,
  error: '',
  page: 0, // 0 -> login | 1 -> signup | 2 -> forgot password
  otpSent: false,
  userVerified: false,
  previousPath: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: state => {
      state.error = '';
    },
    logoutUser: state => {
      state.isLoggedIn = false;
      localStorage.removeItem(AUTH_TOKEN);
    },
    changeAuthPage: (state, action) => {
      state.page = action.payload;
    },
    clearPrevPath: state => {
      state.previousPath = '';
    },
    updatePrevPath: (state, action) => {
      state.previousPath = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;

        try {
          state.error = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.error = action?.error?.message ?? '';
        }
      })
      .addCase(registerUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        try {
          state.error = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.error = action?.error?.message ?? '';
        }
      })
      .addCase(fetchSelf.fulfilled, state => {
        state.isLoggedIn = true;
      })
      .addCase(socialLogin.fulfilled, state => {
        state.isLoggedIn = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        if (action.payload?.success) state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        if (action?.error?.message === 'email_already_verified') {
          console.log('verified');
          state.userVerified = true;
        } else if (action?.error?.message === 'user_already_exist') {
          state.error = 'User already exist, please signin';
        }
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        if (action.payload?.success) state.userVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action?.error?.message || '';
      });
  }
});

export const {
  resetError,
  logoutUser,
  changeAuthPage,
  clearPrevPath,
  updatePrevPath
} = authSlice.actions;

export default authSlice.reducer;
