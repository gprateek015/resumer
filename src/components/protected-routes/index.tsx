'use client';

import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { autoLogin } from '@/utils';
import { updatePrevPath } from '@/redux/slice/auth';
import { PROTECTED_ROUTES } from '@/constants';
import Link from 'next/link';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const pathname = usePathname();
  const dispatch = useDispatch();

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
      {!isLoggedIn && PROTECTED_ROUTES.includes(pathname) ? (
        <Link href='/' />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoutes;
