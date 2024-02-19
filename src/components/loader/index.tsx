import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <Grid
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress sx={{ color: 'white' }} />
    </Grid>
  );
};

export default Loader;
