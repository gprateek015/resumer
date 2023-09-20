import Chatbot from '@/components/chatbot';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const Onboarding = () => {
  return (
    <Grid
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1'
      }}
    >
      <Chatbot />
    </Grid>
  );
};

export default Onboarding;
