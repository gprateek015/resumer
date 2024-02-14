import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options, PageNavButton, Subheading } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';

const HighestEducation = ({ prevPage, nextPage }: PageNavPropsType) => {
  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>Did you graduate from college / university?</Heading>
        <Subheading>Please tell us so we can optimise your resume.</Subheading>
        <Options>
          <Option onClick={() => nextPage()}>
            <Typography>Yes</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>Still Enrolled</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>No</Typography>
          </Option>
        </Options>
      </Grid>
    </PageContainer>
  );
};

export default HighestEducation;
