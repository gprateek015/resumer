'use client';

import React, { useRef } from 'react';
import { Grid } from '@mui/material';
import { NavLink, AuthButton } from './styles';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '@/redux/store';
import { changeAuthPage, logoutUser } from '@/redux/slice/auth';
import { clearUserData } from '@/redux/slice/user';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { righteous, space_grotest } from '@/font-family';

const Navbar = () => {
  const { isLoggedIn, page } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const routes = useRouter();
  const authRef = useRef<any>(null);

  const pathname = usePathname();

  const handleClick = async () => {
    await signOut({redirect: false});
    if (isLoggedIn) {
      dispatch(clearUserData());
      dispatch(logoutUser());
    } else {
      // routes.replace('/');
      dispatch(changeAuthPage(page === 0 ? 1 : 0));

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: { xs: '15px 25px', md: '15px 80px' },
        alignItems: 'center',
        // background:
        //   'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 113.38%)',
        background: 'transparent',
        // background: 'black',
        backdropFilter: 'blur(20px)',
        position: 'fixed',
        top: '0px',
        width: '100vw',
        zIndex: '100',
        height: '70px'
      }}
      className={space_grotest.className}
    >
      <Link href='/'>
        <NavLink
          active='true'
          sx={{ fontSize: '22px', fontFamily: righteous.style.fontFamily }}
        >
          Resumer
        </NavLink>
      </Link>
      <Grid
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: '40px'
        }}
      >
        {!isLoggedIn && (
          <Link href='/'>
            <NavLink active={(pathname === '/').toString()}>Home</NavLink>
          </Link>
        )}
        {isLoggedIn && (
          <Link href='/profile'>
            <NavLink active={(pathname === '/profile').toString()}>
              Profile
            </NavLink>
          </Link>
        )}
        {isLoggedIn && (
          <Link href='/job-description'>
            <NavLink
              active={['/job-description', '/workbench']
                .includes(pathname)
                .toString()}
            >
              New Resume
            </NavLink>
          </Link>
        )}
        <Link href='/about'>
          <NavLink active={(pathname === '/about').toString()}>
            About Us
          </NavLink>
        </Link>
        <Link href='/products'>
          <NavLink active={(pathname === '/products').toString()}>
            Products
          </NavLink>
        </Link>
      </Grid>
      <Grid ref={authRef}>
        <AuthButton onClick={handleClick} sx={{ minWidth: '95px', fontFamily: righteous.style.fontFamily }}>
          {isLoggedIn ? 'Log out' : page === 0 ? 'Sign up' : 'Sign in'}
        </AuthButton>
      </Grid>
    </Grid>
  );
};

export default Navbar;
