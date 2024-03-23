'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { DividerWithText, ThirdPartyBtns, FormLabel } from './styles';
import { Form, useForm } from 'react-hook-form';

import GoogleIcon from '@/assets/icons/google-icon.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { RootState, useDispatch, useSelector } from '@/redux/store';
import { loginUser, registerUser, sendOtp, verifyOtp } from '@/actions/user';
import {
  changeAuthPage,
  resetError,
  resetRegistrationState
} from '@/redux/slice/auth';
import PasswordField from './password-field';
import { FormInput } from '../onboarding-questions/styles';
import OTPInput from 'react-otp-input';
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';

import './otp-input.css';

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
    control,
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
    otpSent,
    loading
  } = useSelector(state => state.auth);
  const [apiErrorStr, setApiErrorStr] = useState('');
  const [step, setStep] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [otpInputWidth, setOtpInputWidth] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const getButtonText = () => {
    if (step === 0) return 'Send OTP';
    else if (step === 1) return 'Verify';
    else return 'Register';
  };

  const restartRegistration = () => {
    setStep(0);
    dispatch(resetRegistrationState());
  };

  useEffect(() => {
    if (otpSent) {
      setStep(curr => (curr === 0 ? 1 : curr));
      enqueueSnackbar('OTP Successfully sent!!', {
        variant: 'success',
        preventDuplicate: true
      });
    }
  }, [otpSent]);

  useEffect(() => {
    if (userVerified) {
      setStep(curr => (curr <= 1 ? 2 : curr));
      enqueueSnackbar('Email verified!!', {
        variant: 'success',
        preventDuplicate: true
      });
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

  useEffect(() => {
    if (!email) {
      restartRegistration();
    }
  }, [email]);

  useEffect(() => {
    if (containerRef?.current) {
      setOtpInputWidth((containerRef.current.offsetWidth - 53) / 6);
    }
  }, [containerRef]);

  return (
    <>
      <Form control={control}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
          ref={containerRef}
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
              InputProps={{
                endAdornment: step === 1 && (
                  <InputAdornment position='end'>
                    <EditIcon
                      sx={{
                        cursor: 'pointer',
                        color: 'rgba(255, 255, 255, 0.90)'
                      }}
                      onClick={restartRegistration}
                    />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          {step === 1 && (
            <Grid>
              <FormLabel>OTP</FormLabel>

              <OTPInput
                numInputs={6}
                value={otp}
                onChange={val => setValue('otp', val)}
                renderSeparator={<span>&nbsp;&nbsp;</span>}
                renderInput={props => (
                  <input
                    {...props}
                    className='otp-input'
                    style={{
                      width: otpInputWidth
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
              <FormLabel>Set New Password</FormLabel>

              <PasswordField
                {...register('password', {
                  required: 'Set a unique password'
                })}
                helperText={errors?.password?.message as string}
                error={!!errors?.password}
                fullWidth
                placeholder='Password'
              />
            </Grid>
          )}
          <Grid>
            <FormHelperText
              error
              sx={{
                mb: '5px',
                textAlign: 'center'
              }}
            >
              {apiErrorStr}
            </FormHelperText>
            <Button
              sx={{
                borderRadius: '10px',
                border: '1px solid #FFF',
                background: '#FFF',
                padding: '10px',
                fontFamily: 'inherit'
              }}
              onClick={handleSubmit(onSubmit)}
              type='submit'
              disabled={loading}
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
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  justifyContent: 'center'
                }}
              >
                {loading && (
                  <CircularProgress
                    sx={{
                      width: '20px !important',
                      height: '20px !important'
                    }}
                  />
                )}
                {getButtonText()}
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
      </Form>
    </>
  );
};

export default Register;
