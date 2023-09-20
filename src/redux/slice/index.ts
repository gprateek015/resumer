import userSlice from './user';
import authSlice from './auth';

const reducers = {
  user: userSlice,
  auth: authSlice
};

export default reducers;
