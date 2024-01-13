import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options, PageNavButton } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';

const HighestEducation = ({ prevPage, nextPage }: PageNavPropsType) => {
  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>
          Did you graduate from <br /> college / university?
        </Heading>
        <Typography>Please tell us so we can optimise your resume.</Typography>
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
