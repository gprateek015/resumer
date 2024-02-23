'use client';

import { Button, Divider, Typography, styled } from '@mui/material';

export const ThirdPartyBtns = styled(Button)({
  background: '#ffffff',
  color: 'black',
  width: '100%',
  '&:hover': {
    background: '#ffffffd1'
  }
});

export const DividerWithText = styled(Divider)({
  display: 'flex',
  alignItems: 'center',
  '&::before,::after': {
    borderColor: 'rgba(255, 255, 255, 0.11)'
  },
  '& span': {
    color: 'rgba(255, 255, 255, 0.49)'
  }
});

export const FormLabel = styled(Typography)({
  textAlign: 'left',
  marginBottom: '5px',
  color: 'rgba(255, 255, 255, 0.70)',
  fontSize: '1em'
});
