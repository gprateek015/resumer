import userSlice from './user';
import authSlice from './auth';
import onboardingSlice from './onboarding';

const reducers = {
  user: userSlice,
  auth: authSlice,
  onboarding: onboardingSlice
};

export default reducers;
