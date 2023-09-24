'use client';

import { Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const PdfViewer = ({ pdfUrl }: { pdfUrl: any }) => {
  // const container = useRef<HTMLDivElement>(null);

  return (
    // <Grid ref={container} minHeight={'600px'} maxWidth={'40vw'}>
    <Document file={pdfUrl}>
      <Page
        pageNumber={1}
        width={480}
        renderAnnotationLayer={false}
        renderMode='canvas'
        renderTextLayer={false}
      />
    </Document>
    // </Grid>
  );
};

export default PdfViewer;
