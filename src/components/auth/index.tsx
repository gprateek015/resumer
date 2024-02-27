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
import { clearPrevPath } from '@/redux/slice/auth';
import { useSnackbar } from 'notistack';

const AuthBox = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const route = useRouter();
  const { page, isLoggedIn, previousPath } = useSelector(state => state.auth);
  const { data: user } = useSelector(state => state.user);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (session.status === 'authenticated') {
      dispatch(socialLogin({ ...session.data.user }));
    }
  }, [session]);

  useEffect(() => {
    if (isLoggedIn) {
      enqueueSnackbar('Logged in successfully', {
        preventDuplicate: true,
        variant: 'success'
      });

      if (!user.onboarding_completed) route.replace('/onboarding');
      else {
        route.replace(previousPath || '/job-description');
        dispatch(clearPrevPath());
      }
    }
  }, [isLoggedIn]);

  return (
    <Grid
      sx={{
        width: { xs: 'calc(100vw - 30px)', md: '500px' },
        maxWidth: '450px',
        padding: { xs: '30px 30px', md: '6% 50px' },
        borderRadius: '20px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 100%)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}
    >
      <Typography fontWeight={'500'} fontSize={'1em'}>
        You Must Sign in to join
      </Typography>
      <Typography fontWeight={'300'} fontSize={'0.8em'}>
        We&apos;re a team that guides each other
      </Typography>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          margin: '10px 0px'
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
