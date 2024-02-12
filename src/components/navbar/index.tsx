'use client';

import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { SignupBtn, NavLink } from './styles';
import Link from 'next/link';

import { Righteous } from 'next/font/google';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@/redux/store';
import { changeAuthPage, logoutUser } from '@/redux/slice/auth';
import { clearUserData } from '@/redux/slice/user';
import { usePathname, useRouter } from 'next/navigation';
import { autoLogin } from '@/utils';
import { signOut } from 'next-auth/react';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

const Navbar = () => {
  const { isLoggedIn, page } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const route = useRouter();
  const authRef = useRef<any>(null);

  const pathname = usePathname();

  const handleClick = () => {
    if (isLoggedIn) {
      dispatch(logoutUser());
      dispatch(clearUserData());
      signOut();
    } else {
      dispatch(changeAuthPage(page === 0 ? 1 : 0));

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
    route.replace('/');
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: { xs: '15px 25px', md: '15px 80px' },
        alignItems: 'center',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 113.38%)',
        // background: 'transparent'
        // background: 'black',
        backdropFilter: 'blur(20px)',
        position: 'fixed',
        top: '0px',
        width: '100vw',
        zIndex: '100',
        height: '70px'
      }}
      className={righteous.className}
    >
      <Link href='/'>
        <NavLink active='true' sx={{ fontSize: '22px' }}>
          Resumer
        </NavLink>
      </Link>
      <Grid
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: '40px'
        }}
      >
        <Link href='/'>
          <NavLink active='true'>Home</NavLink>
        </Link>
        <Link href='/'>
          <NavLink active='false'>About Us</NavLink>
        </Link>
        <Link href='/'>
          <NavLink active='false'>FAQs</NavLink>
        </Link>
        <Link href='/'>
          <NavLink active='false'>Templates</NavLink>
        </Link>
      </Grid>
      <Grid ref={authRef}>
        <SignupBtn onClick={handleClick}>
          {isLoggedIn ? 'Log out' : page === 0 ? 'Sign up' : 'Sign in'}
        </SignupBtn>
      </Grid>
    </Grid>
  );
};

export default Navbar;
