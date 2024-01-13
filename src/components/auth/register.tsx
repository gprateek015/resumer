'use client';

import React from 'react';
import { Grid, Typography, Button, FormHelperText } from '@mui/material';
import {
  DividerWithText,
  FormInput,
  ThirdPartyBtns,
  FormLabel
} from './styles';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { RootState, useDispatch } from '@/redux/store';
import { loginUser, registerUser } from '@/actions/user';
import { useSelector } from 'react-redux';
import { changeAuthPage, resetError } from '@/redux/slice/auth';
import PasswordField from './password-field';

type FormValues = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormValues>();
  const { error } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: FormValues) => {
    dispatch(resetError());
    dispatch(registerUser(data));
  };

  return (
    <Grid
      sx={{
        width: '500px',
        padding: '40px 60px',
        minHeight: '630px',
        borderRadius: '20px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 100%)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}
      // className={poppins.className}
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
            <LinkedInIcon
              sx={{ color: '#0073b1', width: '25px', height: '25px' }}
            />
          }
        >
          <Typography
            fontWeight={'500'}
            fontSize={'14px'}
            sx={{
              textTransform: 'none'
            }}
          >
            Sign in with LinkedIn
          </Typography>
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
        <Grid
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}
        >
          <Grid sx={{ flexBasis: '50%' }}>
            <FormLabel>First name</FormLabel>
            <FormInput
              {...register('first_name', {
                required: 'Please enter your first name'
              })}
              fullWidth
              placeholder='John'
              helperText={errors?.first_name?.message as string}
              error={!!errors?.first_name}
            />
          </Grid>
          <Grid sx={{ flexBasis: '50%' }}>
            <FormLabel>Last name</FormLabel>
            <FormInput
              {...register('last_name', {
                required: 'Please enter your last name'
              })}
              fullWidth
              placeholder='Doe'
              helperText={errors?.last_name?.message as string}
              error={!!errors?.last_name}
            />
          </Grid>
        </Grid>
        <Grid>
          <FormLabel>Email</FormLabel>
          <FormInput
            {...register('email', { required: 'Please enter your email' })}
            fullWidth
            placeholder='janedoe@email.com'
            helperText={errors?.email?.message as string}
            error={!!errors?.email}
          />
        </Grid>
        <Grid>
          <FormLabel>Password</FormLabel>

          <PasswordField
            {...register('password', {
              required: 'Please enter your password'
            })}
            helperText={errors?.email?.message as string}
            error={!!errors?.email}
            fullWidth
            placeholder='Password'
          />
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
        <FormHelperText error>{error}</FormHelperText>
        <Grid>
          <Button
            sx={{
              borderRadius: '10px',
              border: '1px solid #FFF',
              background: '#FFF',
              padding: '10px'
            }}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography
              sx={{
                background:
                  'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '14px',
                fontWeight: '600',
                width: '135px',
                letterSpacing: '1px'
              }}
            >
              Register
            </Typography>
          </Button>
        </Grid>
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
          Already have an account?
        </Typography>
        <Typography
          fontWeight={'600'}
          fontSize={'14px'}
          onClick={() => dispatch(changeAuthPage(0))}
          sx={{ cursor: 'pointer' }}
        >
          Sign In
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Register;
