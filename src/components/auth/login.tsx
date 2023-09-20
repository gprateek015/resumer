import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField
} from '@mui/material';
import {
  DividerWithText,
  FormInput,
  ThirdPartyBtns,
  FormLabel
} from './styles';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const poppins = Poppins({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: 'normal'
});

const Login = () => {
  return (
    <Grid
      sx={{
        width: '500px',
        padding: '50px 80px',
        height: '630px',
        borderRadius: '20px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 100%)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}
      className={poppins.className}
    >
      <Typography fontWeight={'500'} fontSize={'17px'}>
        You Must Sign in to join
      </Typography>
      <Typography fontWeight={'300'} fontSize={'14px'}>
        We're a team that guides each other
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
        >
          Sign in with Google
        </ThirdPartyBtns>
        <ThirdPartyBtns
          startIcon={
            <LinkedInIcon
              sx={{ color: '#0073b1', width: '25px', height: '25px' }}
            />
          }
        >
          Sign in with LinkedIn
        </ThirdPartyBtns>
      </Grid>
      <DividerWithText>or</DividerWithText>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <Grid>
          <FormLabel>Email or Username</FormLabel>
          <FormInput fullWidth placeholder='janedoe@email.com' />
        </Grid>
        <Grid>
          <FormLabel>Password</FormLabel>
          <FormInput fullWidth placeholder='Password' />
        </Grid>
        <Grid>
          <Typography
            sx={{
              float: 'right',
              transform: 'translateY(-5px)',
              cursor: 'pointer'
            }}
          >
            Forgot Password?
          </Typography>
        </Grid>
        <Button
          sx={{
            borderRadius: '10px',
            border: '1px solid #FFF',
            background: '#FFF',
            padding: '10px'
          }}
        >
          <Typography
            sx={{
              background:
                'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '16px',
              fontWeight: '600',
              width: '135px',
              letterSpacing: '1px'
            }}
          >
            Sign In
          </Typography>
        </Button>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          gap: '5px',
          justifyContent: 'center',
          marginTop: '40px'
        }}
      >
        <Typography
          sx={{ color: 'rgba(255, 255, 255, 0.80)' }}
          fontSize={'14px'}
        >
          Don't have an account ?
        </Typography>
        <Typography fontWeight={'600'} fontSize={'14px'}>
          Sign Up
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
