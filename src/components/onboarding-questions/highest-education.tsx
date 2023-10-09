import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options } from './styles';

const HighestEducation = () => {
  return (
    <Grid>
      <Heading mb='20px'>
        Did you graduate from <br /> college / university?
      </Heading>
      <Typography>
        Please tell us so we can optimise your resume.
      </Typography>
      <Options>
        <Option>
          <Typography>Yes</Typography>
        </Option>
        <Option>
          <Typography>Still Enrolled</Typography>
        </Option>
        <Option>
          <Typography>No</Typography>
        </Option>
      </Options>
    </Grid>
  );
};

export default HighestEducation;
