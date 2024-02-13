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
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      <Grid width={width}>
        {uint8Array && (
          <Viewer
            fileUrl={uint8Array}
            // plugins={[defaultLayoutPluginInstance]}

            // pageLayout={{
            //   transformSize: ({
            //     numPages,
            //     pageIndex,
            //     size
            //   }: {
            //     numPages: number;
            //     pageIndex: number;
            //     size: { width: number; height: number };
            //   }) => {
            //     return {
            //       ...size,
            //       width: width as number
            //     };
            //   }
            // }}
          />
        )}
      </Grid>
    </Worker>
  );
};

export default PdfViewer;
