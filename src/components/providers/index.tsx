'use client';

import React, { ReactNode } from 'react';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { Provider as ReduxProvider } from 'react-redux';
import store, { DnDBackendContext } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

let persistor = persistStore(store);

const Providers = ({ children }: { children: ReactNode }) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const Backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <SessionProvider>
              <DnDBackendContext.Provider value={Backend}>
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
              </DnDBackendContext.Provider>
            </SessionProvider>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default Providers;
