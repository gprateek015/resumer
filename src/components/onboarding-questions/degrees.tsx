import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options } from './styles';

const Degrees = () => {
  return (
    <Grid>
      <Heading mb='20px'>
        Which all degrees do <br /> you hold?
      </Heading>
      <Typography>Select even if you are enrolled.</Typography>
      <Options>
        <Option>
          <Typography textAlign={'center'}>Bachelor of Technology</Typography>
        </Option>
        <Option>
          <Typography textAlign={'center'}>Master of Technology</Typography>
        </Option>
        <Option>
          <Typography textAlign={'center'}>Master in Science</Typography>
        </Option>
        <Option>
          <Typography>Diploma</Typography>
        </Option>
        <Option>
          <Typography>Other</Typography>
        </Option>
      </Options>
    </Grid>
  );
};

export default Degrees;
