import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options, PageNavButton } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';

const WorkExperience = ({ nextPage, prevPage }: PageNavPropsType) => {
  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>How much work experience do you have?</Heading>
        <Typography>
          Includes internships, summer jobs, and unofficial jobs.
        </Typography>
        <Options mt='40px'>
          <Option onClick={() => nextPage()}>
            <Typography>None</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>3 or less years</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>3-5 years</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>5-10 years</Typography>
          </Option>
          <Option onClick={() => nextPage()}>
            <Typography>10+ years</Typography>
          </Option>
        </Options>
      </Grid>
    </PageContainer>
  );
};

export default WorkExperience;
