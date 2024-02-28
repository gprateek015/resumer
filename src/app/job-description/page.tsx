import DescriptionForm from '@/components/job-description';
import { Heading } from '@/components/onboarding-questions/styles';
import { righteous } from '@/font-family';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const JobDescription = () => {
  return (
    <Grid
      sx={{
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { md: 'center' },
        alignItems: 'center',
        borderRadius: '20px',
        padding: { xs: '20px', md: '20px 40px' },
        width: '100%',
        maxHeight: { md: '600px' }
      }}
      className={righteous.className}
    >
      <Heading mb='25px'>Please provide us with the job description</Heading>
      <DescriptionForm />
    </Grid>
  );
};

export default JobDescription;
