'use client';

import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { autoLogin } from '@/utils';

const PROTECTED_ROUTES = [
  '/onboarding',
  '/workbench',
  '/profile',
  '/job-description'
];
const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const route = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (PROTECTED_ROUTES.includes(pathname) && !isLoggedIn) {
  //     route.replace('/');
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return <>{children}</>;
};

export default ProtectedRoutes;
