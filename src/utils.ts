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
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');

export const downloadPDF = (pdfArrayBuffer: ArrayBuffer, filename: string) => {
  const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });

  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = `${filename}`;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
};
