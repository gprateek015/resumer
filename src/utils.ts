import { fetchSelf } from './actions/user';
import { AUTH_TOKEN } from './constants';
import { addAuthToken } from './redux/slice/user';
import { AppDispatch } from './redux/store';

export const autoLogin = (callback?: Function) => {
  return async (dispatch: AppDispatch) => {
    const auth_token = localStorage.getItem(AUTH_TOKEN);

    if (auth_token) {
      dispatch(addAuthToken(auth_token));
      await dispatch(fetchSelf());
    }
    callback?.();
  };
};

export const firstLetterCapital = (str: string) =>
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');

export const downloadPDF = ({
  pdfArrayBuffer,
  pdfBlob,
  filename
}: {
  pdfArrayBuffer?: ArrayBuffer;
  pdfBlob?: Blob;
  filename: string;
}) => {
  if (!pdfArrayBuffer && !pdfBlob) throw new Error('File is required!');

  let blob;

  if (!pdfBlob && pdfArrayBuffer) {
    blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
  } else if (pdfBlob && !pdfArrayBuffer) {
    blob = pdfBlob;
  }

  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob as Blob);
  downloadLink.download = `${filename}`;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
};
