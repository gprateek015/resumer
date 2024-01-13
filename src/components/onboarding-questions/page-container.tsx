import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import { PageNavButton } from './styles';

const PageContainer = ({
  children,
  prevPage,
  nextPage
}: {
  children: ReactNode;
  nextPage: Function;
  prevPage: Function;
}) => {
  return (
    <>
      <Grid
        sx={{
          height: 'calc(100% - 60px)',
          overflowY: 'auto',
          padding: '10px'
        }}
      >
        {children}
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '30px'
        }}
      >
        <PageNavButton variant='outlined' onClick={() => prevPage()}>
          Previous
        </PageNavButton>
        <PageNavButton variant='outlined' onClick={() => nextPage()}>
          Next
        </PageNavButton>
      </Grid>
    </>
  );
};

export default PageContainer;
