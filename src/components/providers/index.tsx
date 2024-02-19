'use client';

import React, { ReactNode } from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <SnackbarProvider
              maxSnack={2}
              hideIconVariant
              action={key => (
                <CloseIcon
                  sx={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => closeSnackbar(key)}
                />
              )}
            >
              {children}
            </SnackbarProvider>
          </SessionProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
};

export default Providers;
