import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options } from './styles';

const WorkExperience = () => {
  return (
    <Grid>
      <Heading mb='20px'>
        How much work <br /> experience do you have?
      </Heading>
      <Typography>
        Includes internships, summer jobs, and unofficial jobs.
      </Typography>
      <Options>
        <Option>
          <Typography>None</Typography>
        </Option>
        <Option>
          <Typography>3 or less years</Typography>
        </Option>
        <Option>
          <Typography>3-5 years</Typography>
        </Option>
        <Option>
          <Typography>5-10 years</Typography>
        </Option>
        <Option>
          <Typography>10+ years</Typography>
        </Option>
      </Options>
    </Grid>
  );
};

export default WorkExperience;
