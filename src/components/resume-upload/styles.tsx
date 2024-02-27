'use client';

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 'calc(100vh - 90px)',
  background: '#25507B',
  padding: '30px 0px',
  textAlign: 'center'
});

export const Heading = styled(Typography)({
  color: 'white',
  fontWeight: '600'
});

export const SubHeading = styled(Typography)({
  color: 'white',
  fontWeight: '500',
  fontSize: '32px'
});

export const UploadContainer = styled(Grid)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '0px 12px'
});

export const Uploader = styled(Grid)(({ theme }) => ({
  height: '100%',
  padding: '0px 40px 25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid white',
  borderRadius: '15px',
  cursor: 'pointer',
  textAlign: 'center',
  backdropFilter: 'blur(20px)',

  [theme.breakpoints.down('md')]: {
    padding: '25px 40px'
  }
}));
