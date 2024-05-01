'use client';

import { useSelector } from '@/redux/store';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

const AllSnackbars = ({ children }: { children: React.ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { apiFailed, apiPending, apiSuccessfull } = useSelector(
    state => state.user
  );

  useEffect(() => {
    if (!apiPending && apiSuccessfull) {
      enqueueSnackbar('Profile successfully updated!!', { variant: 'success' });
    } else if (!apiPending && apiFailed) {
      enqueueSnackbar('Profile update failed! Try again...', {
        variant: 'error'
      });
    }
  }, [apiFailed, apiPending, apiSuccessfull]);

  return children;
};

export default AllSnackbars;
