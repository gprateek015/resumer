'use client';

import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { autoLogin } from '@/utils';
import { updatePrevPath } from '@/redux/slice/auth';
import { PROTECTED_ROUTES } from '@/constants';
import { CircularProgress } from '@mui/material';
import Loader from '../loader';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const routes = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoggedIn && PROTECTED_ROUTES.includes(pathname)) {
      const searchParamsString = searchParams.toString();
      dispatch(updatePrevPath(`${pathname}?${searchParamsString}`));
      routes.replace('/');
    }
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <>
      {!isLoggedIn && PROTECTED_ROUTES.includes(pathname) ? (
        <Loader />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoutes;
