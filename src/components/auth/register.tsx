'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, FormHelperText } from '@mui/material';
import { DividerWithText, ThirdPartyBtns, FormLabel } from './styles';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { RootState, useDispatch } from '@/redux/store';
import { loginUser, registerUser, sendOtp, verifyOtp } from '@/actions/user';
import { useSelector } from 'react-redux';
import { changeAuthPage, resetError } from '@/redux/slice/auth';
import PasswordField from './password-field';
import { FormInput } from '../onboarding-questions/styles';
import OTPInput from 'react-otp-input';

type FormValues = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  otp: string;
};

const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
    setValue
  } = useForm<FormValues>();
  const {
    error: apiError,
    userVerified,
    otpSent
  } = useSelector((state: RootState) => state.auth);
  const [apiErrorStr, setApiErrorStr] = useState('');
  const [step, setStep] = useState(0);

  const otp = watch('otp');
  const email = watch('email');

  const onSubmit = (data: FormValues) => {
    dispatch(resetError());
    if (step === 0) {
      dispatch(sendOtp({ email: data.email }));
    } else if (step === 1) {
      if (!data.otp) {
        setError('otp', { message: 'Please enter the OTP' });
        return;
      }
      dispatch(verifyOtp({ email: data.email, otp: data.otp }));
    } else {
      const newData = {
        ...data,
        otp: undefined
      };
      dispatch(registerUser(newData));
    }
  };

  useEffect(() => {
    if (otpSent) {
      setStep(curr => (curr === 0 ? 1 : curr));
    }
  }, [otpSent]);

  useEffect(() => {
    if (userVerified) {
      setStep(curr => (curr <= 1 ? 2 : curr));
    }
  }, [userVerified]);

  useEffect(() => {
    if (typeof apiError === 'object') {
      Object.keys(apiError || {}).forEach((error: any) => {
        setError(error, { message: (apiError as any)[error].message });
      });
    } else {
      setApiErrorStr(apiError);
    }
  }, [apiError]);

  // useEffect(() => {
  //   if (!email) {
  //     setStep(0);
  //   }
  // }, [email]);

  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {step === 0 && (
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
        )}
        <Grid>
          <FormLabel>Email</FormLabel>
          <FormInput
            {...register('email', { required: 'Please enter your email' })}
            fullWidth
            placeholder='johndoe@email.com'
            helperText={errors?.email?.message as string}
            error={!!errors?.email}
            disabled={step !== 0}
            sx={{
              '& .Mui-disabled input': {
                color: 'white',
                WebkitTextFillColor: 'white'
              }
            }}
          />
        </Grid>
        {step === 1 && (
          <Grid>
            <FormLabel>OTP</FormLabel>

            <OTPInput
              numInputs={4}
              value={otp}
              onChange={val => setValue('otp', val)}
              renderSeparator={<span>&nbsp;&nbsp;</span>}
              renderInput={props => (
                <input
                  {...props}
                  style={{
                    width: '12px',
                    height: '20px',
                    padding: '12px 16px',
                    border: '1px solid #DDD',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.10)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 0
                  }}
                  placeholder='0'
                />
              )}
              shouldAutoFocus={true}
            />
            <FormHelperText error>{errors?.otp?.message}</FormHelperText>
          </Grid>
        )}
        {step === 2 && (
          <Grid>
            <FormLabel>Password</FormLabel>

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
        )}
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
          marginTop: '15px'
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
    </>
  );
};

export default Register;
