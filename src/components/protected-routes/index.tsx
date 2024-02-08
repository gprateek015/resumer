'use client';

import React, { ReactNode, useEffect } from 'react';
import { useSelector } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';

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

  // useEffect(() => {
  //   if (PROTECTED_ROUTES.includes(pathname) && !isLoggedIn) {
  //     route.replace('/');
  //   }
  // }, [isLoggedIn]);

  return <>{children}</>;
};

export default ProtectedRoutes;
