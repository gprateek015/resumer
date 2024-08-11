
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
