import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { SignupBtn, NavLink } from './styles';
import Link from 'next/link';

import { Righteous } from 'next/font/google';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

const Navbar = () => {
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
      <Typography color={'white'}>LOGO</Typography>
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
          <NavLink active='false'>Collection</NavLink>
        </Link>
        <Link href='/'>
          <NavLink active='false'>Artists</NavLink>
        </Link>
      </Grid>
      <Grid>
        <SignupBtn>Sign up</SignupBtn>
      </Grid>
    </Grid>
  );
};

export default Navbar;
