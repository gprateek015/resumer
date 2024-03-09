import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSelf,
  loginUser,
  registerUser,
  sendOtp,
  socialLogin,
  verifyOtp
} from '@/actions/user';
import { AUTH_TOKEN, ONBOARDING_STARTED } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const initialState = {
  isLoggedIn: false,
  error: '',
  page: 0, // 0 -> login | 1 -> signup | 2 -> forgot password
  otpSent: false,
  userVerified: false,
  previousPath: '',
  loading: false
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
      localStorage.removeItem(ONBOARDING_STARTED);
    },
    changeAuthPage: (state, action) => {
      state.page = action.payload;
    },
    clearPrevPath: state => {
      state.previousPath = '';
    },
    updatePrevPath: (state, action) => {
      state.previousPath = action.payload;
    },
    resetRegistrationState: state => {
      state.otpSent = false;
      state.userVerified = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.error = '';
        state.loading = false;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        enqueueSnackbar('Login failed!', { variant: 'error' });
        state.isLoggedIn = false;
        state.loading = false;

        try {
          state.error = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.error = action?.error?.message ?? '';
        }
      })
      .addCase(registerUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.error = '';
        state.loading = false;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loading = false;

        try {
          state.error = JSON.parse(action?.error?.message || '');
        } catch (_) {
          state.error = action?.error?.message ?? '';
        }
      })
      .addCase(fetchSelf.fulfilled, state => {
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(fetchSelf.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchSelf.pending, state => {
        state.loading = true;
      })
      .addCase(socialLogin.fulfilled, state => {
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(socialLogin.pending, state => {
        state.loading = true;
      })
      .addCase(socialLogin.rejected, state => {
        state.loading = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        if (action.payload?.success) state.otpSent = true;
        state.loading = false;
      })
      .addCase(sendOtp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;

        if (action?.error?.message === 'email_already_verified') {
          state.userVerified = true;
        } else if (action?.error?.message === 'user_already_exist') {
          state.error = 'User already exist, please signin';
        }
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        if (action.payload?.success) state.userVerified = true;
        state.loading = false;
      })
      .addCase(verifyOtp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action?.error?.message || '';
        state.loading = false;
      });
  }
});

export const {
  resetError,
  logoutUser,
  changeAuthPage,
  clearPrevPath,
  updatePrevPath,
  resetRegistrationState
} = authSlice.actions;

export default authSlice.reducer;
