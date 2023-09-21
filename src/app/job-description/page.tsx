import DescriptionForm from '@/components/jobDescription';
import { Grid, Typography } from '@mui/material';
import { Righteous } from 'next/font/google';
import React from 'react';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

const JobDescription = () => {
  return (
    <Grid
      className={righteous.className}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        fontSize={'35px'}
        sx={{
          padding: '30px'
        }}
      >
        Please paste in your job description here
      </Typography>
      <DescriptionForm />
    </Grid>
  );
};

export default JobDescription;
