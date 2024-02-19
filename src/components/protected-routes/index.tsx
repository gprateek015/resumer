'use client';

import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { autoLogin } from '@/utils';
import { updatePrevPath } from '@/redux/slice/auth';
import { PROTECTED_ROUTES } from '@/constants';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const routes = useRouter();

  useEffect(() => {
    if (!isLoggedIn && PROTECTED_ROUTES.includes(pathname)) {
      dispatch(updatePrevPath(pathname));
    }
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <>
      {!isLoggedIn && PROTECTED_ROUTES.includes(pathname)
        ? routes.replace('/')
        : children}
    </>
  );
};

export default ProtectedRoutes;
