import React, { useEffect, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';

import { Grid } from '@mui/material';

const PdfViewer = ({
  pdf,
  width
}: {
  pdf: ArrayBuffer | null;
  width?: number;
}) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [uint8Array, setUInt8Array] = useState<Uint8Array | null>(null);

  useEffect(() => {
    if (pdf?.byteLength) {
      setUInt8Array(new Uint8Array(pdf));
    }
  }, [pdf]);

  if (!pdf) return <></>;
  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
      <Grid
        sx={{
          width: width,
          '& .rpv-core__inner-page': {
            width: 'fit-content !important',
            position: 'relative !important',
            left: '50% !important',
            transform: 'translateX(-50%) !important'
          }
        }}
      >
        {uint8Array && <Viewer fileUrl={uint8Array} />}
      </Grid>
    </Worker>
  );
};

export default PdfViewer;
