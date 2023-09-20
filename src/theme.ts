'use client';

import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderWidth: '0px !important'
          }
        }
      }
    }
  }
});

export default theme;
