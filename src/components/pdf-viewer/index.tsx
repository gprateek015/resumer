import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import Pdf from '@/assets/pdf.png';

const PdfViewer = () => {
  return (
    <Grid>
      <Image
        src={Pdf}
        alt='pdf'
        style={{
          width: '100%',
          height: '550px'
        }}
      />
    </Grid>
  );
};

export default PdfViewer;
