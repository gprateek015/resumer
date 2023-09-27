'use client';

import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { SignupBtn, NavLink } from './styles';
import Link from 'next/link';

import { Righteous } from 'next/font/google';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@/redux/store';
import { changeAuthPage, logoutUser } from '@/redux/slice/auth';
import { clearUserData } from '@/redux/slice/user';
import { useRouter } from 'next/navigation';
import { autoLogin } from '@/utils';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

const Navbar = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const route = useRouter();

  const handleClick = () => {
    route.push('/');
    if (isLoggedIn) {
      dispatch(logoutUser());
      dispatch(clearUserData());
    } else {
      dispatch(changeAuthPage(1));
    }
  };

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 80px',
        alignItems: 'center',
        background: 'transparent'
      }}
      className={righteous.className}
    >
      {/* <Image src='' alt='Logo' /> */}
      <Link href='/'>
        <NavLink active='true'>
          <Typography fontSize={22}>Dr. Resume</Typography>
        </NavLink>
      </Link>
      <Grid
        sx={{
          display: 'flex',
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
      <Grid>
        <SignupBtn onClick={handleClick}>
          {isLoggedIn ? 'Log out' : 'Sign up'}
        </SignupBtn>
      </Grid>
    </Grid>
  );
};

export default Navbar;
