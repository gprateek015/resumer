import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';

const initialState = {
  isLoggedIn: false,
  error: '',
  page: 0 // 0 -> login | 1 -> signup | 2 -> forgot password
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
        state.error = action.error?.message ?? '';
      })
      .addCase(registerUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = (action.error?.message as any)?.email ?? '';
      });
  }
});

export const { resetError, logoutUser, changeAuthPage } = authSlice.actions;

export default authSlice.reducer;
