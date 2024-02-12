'use client';

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const PdfViewer = ({
  pdf,
  width
}: {
  pdf: ArrayBuffer | null;
  width?: number;
}) => {
  return (
    <Document file={pdf}>
      <Page
        pageNumber={1}
        width={width && width}
        renderAnnotationLayer={false}
        renderMode='canvas'
        renderTextLayer={false}
      />
    </Document>
  );
};

export default PdfViewer;
