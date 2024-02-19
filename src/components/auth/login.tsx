'use client';

import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  FormHelperText,
  Box,
  Icon
} from '@mui/material';
import { DividerWithText, ThirdPartyBtns, FormLabel } from './styles';
import {
  Form,
  FormSubmitHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import Image from 'next/image';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { RootState, useDispatch } from '@/redux/store';
import { loginUser } from '@/actions/user';
import { useSelector } from 'react-redux';
import { changeAuthPage, resetError } from '@/redux/slice/auth';
import PasswordField from './password-field';
import { FormInput } from '../onboarding-questions/styles';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<FormValues>();
  const { error: apiError = '' } = useSelector(
    (state: RootState) => state.auth
  );
  const [apiErrorStr, setApiErrorStr] = useState('');

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(resetError());
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (typeof apiError === 'object') {
      Object.keys(apiError || {}).forEach((error: any) => {
        setError(error, { message: (apiError as any)[error].message });
      });
    } else {
      setApiErrorStr(apiError);
    }
  }, [apiError]);

  return (
    <>
      <Form control={control}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <Grid>
            <FormLabel>Email or Username</FormLabel>
            <FormInput
              {...register('email', { required: 'Please enter your email' })}
              fullWidth
              placeholder='johndoe@email.com'
              helperText={errors?.email?.message as string}
              error={!!errors?.email}
            />
          </Grid>
          <Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <FormLabel>Password</FormLabel>
              <Typography
                sx={{
                  fontSize: '0.9em',
                  cursor: 'pointer',
                  mb: '5px'
                }}
              >
                Forgot Password?
              </Typography>
            </Box>
            <PasswordField
              {...register('password', {
                required: 'Please enter your password'
              })}
              helperText={errors?.password?.message as string}
              error={!!errors?.password}
              fullWidth
              placeholder='Password'
            />
          </Grid>

          <Grid>
            <FormHelperText error>{apiErrorStr}</FormHelperText>
            <Button
              sx={{
                borderRadius: '10px',
                border: '1px solid #FFF',
                background: '#FFF',
                padding: '10px'
              }}
              onClick={handleSubmit(onSubmit)}
              type='submit'
            >
              <Typography
                sx={{
                  background:
                    'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1rem',
                  fontWeight: '600',
                  width: '135px',
                  letterSpacing: '1px'
                }}
              >
                Sign In
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            gap: '5px',
            justifyContent: 'center',
            marginTop: '15px'
          }}
        >
          <Typography
            sx={{ color: 'rgba(255, 255, 255, 0.80)' }}
            fontSize={'0.85rem'}
          >
            Don't have an account ?
          </Typography>
          <Typography
            fontWeight={'600'}
            fontSize={'0.85rem'}
            onClick={() => dispatch(changeAuthPage(1))}
            sx={{ cursor: 'pointer' }}
          >
            Sign Up
          </Typography>
        </Grid>
      </Form>
    </>
  );
};

export default Login;
