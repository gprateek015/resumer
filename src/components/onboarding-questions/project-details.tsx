import React from 'react';
import { Grid } from '@mui/material';

import { FormInput, FormLabel, Heading, Option, Options } from './styles';

const ProjectDetails = () => {
  return (
    <Grid>
      <Heading mb='20px'>
        Please provide us with <br />
        your projects
      </Heading>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <FormLabel>Name of the project</FormLabel>
        <FormInput />
        <FormLabel>Technology stack used</FormLabel>
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
        <FormLabel>Please describe your project below</FormLabel>
        <FormInput multiline rows={7} />
      </Grid>
    </Grid>
  );
};

export default ProjectDetails;
