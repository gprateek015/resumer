import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector
} from 'react-redux';

import reducers from './slice';
import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const onboardingPersistConfig = {
  key: 'onboarding',
  storage,
  whitelist: ['data']
};

const reducer = combineReducers({
  ...reducers,
  onboarding: persistReducer(onboardingPersistConfig, reducers.onboarding)
});

// const persistedReducer = persistReducer(onboardingPersistConfig, reducer);

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['load/resume/fulfilled', 'persist/PERSIST']
      }
    }).concat(process.env.NODE_ENV === 'development' ? [logger as any] : [])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
