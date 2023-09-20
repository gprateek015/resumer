import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '@/actions/user';
import { AUTH_TOKEN } from '@/constants';

const initialState = {
  authAoken: '',
  data: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      state.authAoken = '';
      state.data = {};
    }
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload?.user;
      state.authAoken = action.payload?.token;
      localStorage.setItem(AUTH_TOKEN, action.payload?.token);
    });
  }
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
