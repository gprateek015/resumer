import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options, PageNavButton, Subheading } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';

const HighestEducation = ({ prevPage, nextPage }: PageNavPropsType) => {
  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Heading mb='20px'>Did you graduate from college / university?</Heading>
        <Grid
          flexGrow={1}
          sx={{
            backdropFilter: 'blur(20px)',
            p: '20px',
            borderRadius: '20px',
            border: '1px solid #ffffff87',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Subheading>
            Please tell us so we can optimise your resume.
          </Subheading>
          <Options
            sx={{
              justifyContent: 'center'
            }}
          >
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
      </Grid>
    </PageContainer>
  );
};

export default HighestEducation;
