'use client';

import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { DividerWithText, ThirdPartyBtns } from './styles';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch, useSelector } from '@/redux/store';
import Login from './login';
import Register from './register';
import { socialLogin } from '@/actions/user';
import { useRouter } from 'next/navigation';

const AuthBox = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const route = useRouter();
  const { page, isLoggedIn } = useSelector(state => state.auth);
  const { data: user } = useSelector(state => state.user);

  useEffect(() => {
    if (session.status === 'authenticated') {
      dispatch(socialLogin({ ...session.data.user }));
    }
  }, [session]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     if (!user.onboarding_completed) route.push('/onboarding');
  //     else route.push('/profile');
  //   }
  // }, [isLoggedIn]);

  return (
    <Grid
      sx={{
        width: '500px',
        padding: '40px 60px',
        height: '630px',
        borderRadius: '20px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 100%)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}
    >
      <Typography fontWeight={'500'} fontSize={'17px'}>
        You Must Sign in to join
      </Typography>
      <Typography fontWeight={'300'} fontSize={'14px'}>
        We&apos;re a team that guides each other
      </Typography>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          margin: '15px 0px'
        }}
      >
        <ThirdPartyBtns
          startIcon={
            <Image src={GoogleIcon} alt='icon' width={'25'} height={'25'} />
          }
          onClick={() => signIn('google')}
        >
          <Typography
            fontWeight={'500'}
            fontSize={'14px'}
            sx={{
              textTransform: 'none'
            }}
          >
            Sign in with Google
          </Typography>
        </ThirdPartyBtns>
        <ThirdPartyBtns
          startIcon={
            <GitHubIcon
              sx={{ color: '#0073b1', width: '25px', height: '25px' }}
            />
          }
          onClick={() => signIn('github')}
        >
          <Typography
            fontWeight={'500'}
            fontSize={'14px'}
            sx={{
              textTransform: 'none'
            }}
          >
            Sign in with Github
          </Typography>
        </ThirdPartyBtns>
      </Grid>
      <DividerWithText>or</DividerWithText>
      {page === 0 && <Login />}
      {page === 1 && <Register />}
    </Grid>
  );
};

export default AuthBox;
