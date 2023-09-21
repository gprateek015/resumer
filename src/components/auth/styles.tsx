'use client';

import { Button, Divider, TextField, Typography, styled } from '@mui/material';

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
  },
  mt: '10px'
});

export const FormLabel = styled(Typography)({
  textAlign: 'left',
  marginBottom: '5px',
  color: 'rgba(255, 255, 255, 0.70)',
  fontSize: '16px'
});

export const FormInput = styled(TextField)({
  '& .MuiInputBase-root': {
    background: 'rgba(255, 255, 255, 0.10)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.20)',

    '&.Mui-focused ': {
      border: '2px solid rgba(255, 255, 255, 0.20)'
    },
    '& .MuiInputBase-input': {
      '&::-webkit-input-placeholder': {
        color: 'rgba(255, 255, 255, 0.50)'
      },
      color: 'white',
      padding: '13px 20px'
    }
  }
});
