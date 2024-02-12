import { generateResumeData } from '@/actions/resume';
import { Resume } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {} as Resume
};

export const workbenchSlice = createSlice({
  name: 'workbench',
  initialState,
  reducers: {
    clearWorkbenchData: state => {
      state = initialState;
    }
  },
  extraReducers: builder => {
    builder.addCase(generateResumeData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export const {} = workbenchSlice.actions;

export default workbenchSlice.reducer;
