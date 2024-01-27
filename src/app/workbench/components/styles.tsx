import { Box, Grid, TextField, styled } from '@mui/material';

export const FormLabel = styled(Box)({
  marginBottom: '10px'
});

export const FormInput = styled(TextField)({
  background: '#737373',
  width: '100%',
  borderRadius: '4px',
  '& input': {
    color: 'white',
    padding: '8px 10px',
    fontSize: '14px'
  }
});

export const Row = styled(Grid)({
  display: 'flex',
  gap: '15px'
});

export const InputContainer = styled(Box)({
  flexBasis: '50%',
  flexGrow: 1,
  margin: '7px 0px'
});
