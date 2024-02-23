'use client';

import React, { ReactNode } from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
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
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default Providers;
