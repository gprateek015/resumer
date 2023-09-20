import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch } from 'react-redux';
import logger from 'redux-logger';

import reducers from './slice';

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = useAppDispatch;

export default store;
