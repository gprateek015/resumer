import userSlice from './user';
import authSlice from './auth';
import onboardingSlice from './onboarding';
import workbenchSlice from './workbench';

const reducers = {
  user: userSlice,
  auth: authSlice,
  onboarding: onboardingSlice,
  workbench: workbenchSlice
};

export default reducers;
