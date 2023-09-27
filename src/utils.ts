import { fetchSelf } from './actions/user';
import { AUTH_TOKEN } from './constants';
import { AppDispatch } from './redux/store';

export const autoLogin = () => {
  return (dispatch: AppDispatch) => {
    const auth_token = localStorage.getItem(AUTH_TOKEN);

    if (auth_token) dispatch(fetchSelf());
  };
};
