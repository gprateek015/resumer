import React from 'react';
import { Grid } from '@mui/material';

import { FormInput, FormLabel, Heading, Option, Options } from './styles';

const WorkExperienceDetails = () => {
  return (
    <Grid>
      <Heading mb='20px'>
        Share your internship/ <br />
        work experience with us
      </Heading>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <FormLabel>Employer/company name</FormLabel>
        <FormInput />
        <FormLabel>Job Title</FormLabel>
        <FormInput />
        <FormLabel>Technology stack</FormLabel>
        <FormInput />
        <Grid
          sx={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'space-between'
          }}
        >
          <Grid>
            <FormLabel mb='15px'>Start Date</FormLabel>
            <FormInput type='date' />
          </Grid>
          <Grid>
            <FormLabel mb='15px'>End Date</FormLabel>
            <FormInput type='date' />
          </Grid>
        </Grid>
        <FormLabel>Location</FormLabel>
        <FormInput />
      </Grid>
    </Grid>
  );
};

export default WorkExperienceDetails;
