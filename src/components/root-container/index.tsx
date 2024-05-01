'use client';

import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from '@/redux/store';
import { closeBugDialog } from '@/redux/slice/user';

const RootContainer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { isBugDialogOpen } = useSelector(state => state.user);

  const closeBuyDialogHandler = () => {
    if (isBugDialogOpen) dispatch(closeBugDialog());
  };

  return (
    <Box
      onClick={closeBuyDialogHandler}
      minHeight='100vh'
      maxHeight={{ md: '100vh' }}
      display={'flex'}
      flexDirection={'column'}
      overflow={{ md: 'hidden' }}
      sx={{
        backgroundImage: `url('/assets/test.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {children}
    </Box>
  );
};

export default RootContainer;
