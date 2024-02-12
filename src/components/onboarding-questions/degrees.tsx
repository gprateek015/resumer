import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options, PageNavButton } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';

const Degrees = ({ nextPage, prevPage }: PageNavPropsType) => {
  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>Highest Qualification you hold?</Heading>
        <Typography>Select even if you are enrolled.</Typography>
        <Options>
          <Option onClick={() => nextPage()}>
            <Typography textAlign={'center'}>Bachelor of Technology</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography textAlign={'center'}>Master of Technology</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography textAlign={'center'}>Master in Science</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>Diploma</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>Other</Typography>
          </Option>
        </Options>
      </Grid>
    </PageContainer>
  );
};

export default Degrees;
