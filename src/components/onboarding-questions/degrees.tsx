import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options, PageNavButton, Subheading } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { space_grotest } from '@/font-family';
import { enqueueSnackbar } from 'notistack';

const Degrees = ({ nextPage, prevPage }: PageNavPropsType) => {
  const onNext = () => {
    enqueueSnackbar('Please select your highest qualification', {
      variant: 'warning'
    });
  };
  return (
    <PageContainer nextPage={onNext} prevPage={prevPage}>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Heading mb='20px'>Highest Qualification you hold?</Heading>

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
          className={space_grotest.className}
        >
          <Subheading>Select even if you are enrolled.</Subheading>
          <Options>
            <Option onClick={() => nextPage()}>
              <Typography textAlign={'center'}>
                Bachelor of Technology
              </Typography>
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
      </Grid>
    </PageContainer>
  );
};

export default Degrees;
