import { fetchSelf } from './actions/user';
import { AUTH_TOKEN } from './constants';
import { addAuthToken } from './redux/slice/user';
import { AppDispatch } from './redux/store';

export const autoLogin = () => {
  return (dispatch: AppDispatch) => {
    const auth_token = localStorage.getItem(AUTH_TOKEN);

    if (auth_token) {
      dispatch(addAuthToken(auth_token));
      dispatch(fetchSelf());
    }
  };
};

export const firstLetterCapital = (str: string) =>
  str[0].toUpperCase() + str.slice(1);
