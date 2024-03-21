'use client';

import { createTheme } from '@mui/material';
import { righteous } from './font-family';

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
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: righteous.style.fontFamily
        }
      }
    }
  }
});

export default theme;
