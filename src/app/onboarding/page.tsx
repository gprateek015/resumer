import Chatbot from '@/components/chatbot';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import OnboardingIcon from '@/assets/onboarding.png';

const Onboarding = () => {
  return (
    <Grid
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1',
        gap: '150px'
      }}
    >
      <Chatbot />
      <Grid sx={{}}>
        <Image
          src={OnboardingIcon}
          alt='icon'
          style={{
            height: '450px',
            width: '400px'
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Onboarding;
