'use client';

import React, { useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';

import { Righteous, Poppins } from 'next/font/google';

import Login from '@/components/auth/login';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Register from '@/components/auth/register';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

const poppins = Poppins({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: 'normal'
});

export default function Home() {
  const route = useRouter();
  const { page, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { data: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      if (!user.onboarding_completed) route.push('/onboarding');
      else route.push('/profile');
    }
  }, [isLoggedIn]);

  return (
    <Grid
      display={'flex'}
      alignItems={'center'}
      flexGrow={1}
      className={righteous.className}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%'
        }}
      >
        <Grid
          sx={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            padding: '50px 0px',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography
              fontSize={'66px'}
              lineHeight={'80px'}
              marginBottom={'30px'}
            >
              Improve your <br /> Resume ATS score <br /> Using AI
            </Typography>
            <Typography
              fontSize={'25px'}
              lineHeight={'35px'}
              color='rgba(232, 235, 243, 0.70)'
            >
              Let AI do the heavy lifting for you in optimizing your resumes
              when you apply for various job roles
            </Typography>
          </Box>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px'
            }}
          >
            <Box>
              <Typography fontSize={'30px'} lineHeight={'20px'}>
                12K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Downloads
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={'30px'} lineHeight={'20px'}>
                20K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Visits
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={'30px'} lineHeight={'20px'}>
                10+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Templates
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid className={poppins.className}>
          {page === 0 && <Login />}
          {page === 1 && <Register />}
        </Grid>
      </Grid>
    </Grid>
  );
}
