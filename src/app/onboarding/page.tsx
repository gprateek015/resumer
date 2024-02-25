'use client';

import Chatbot from '@/components/chatbot';
import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import OnboardingIcon from '@/assets/onboarding2.png';

import OnboardingQuestions from '@/components/onboarding-questions';
import { righteous } from '@/font-family';
import { useDispatch, useSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { ONBOARDING_STARTED } from '@/constants';

const Onboarding = () => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: user } = useSelector(state => state.user);

  useEffect(() => {
    if (user.onboarding_completed) router.replace('/job-description');
    else {
      const onboardingStarted = localStorage.getItem(ONBOARDING_STARTED);
      if (onboardingStarted === 'true') {
        setShowQuestions(true);
      }
    }
  }, []);

  const showMoreQuestions = () => {
    setShowQuestions(true);
    localStorage.setItem(ONBOARDING_STARTED, 'true');
  };

  return (
    <Grid
      sx={{
        width: '100vw',
        flexGrow: '1',
        gap: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      className={righteous.className}
    >
      {!showQuestions ? (
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            background: 'rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(20px)',
            width: { xs: 'calc(100vw - 30px)', md: 'fit-content' },
            maxHeight: 'calc(100vh - 100px)',
            borderRadius: '20px',
            padding: { xs: '10px', md: '20px 30px 20px 10px' },
            position: 'relative',
            maxWidth: { xs: '380px', md: '1000px' }
          }}
        >
          <Typography fontSize={'1.5rem'} fontWeight={'400'}>
            Welcome to Resumer!
          </Typography>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              width: 'fit-content',
              height: 'fit-content',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Chatbot showMoreQuestions={showMoreQuestions} />
            <Grid
              sx={{
                alignSelf: 'flex-end',
                overflow: 'hidden',
                position: { xs: 'absolute', md: 'static' },
                zIndex: '-1',
                top: '50%',
                left: '50%',
                transform: {
                  xs: 'translate(-50%, -50%)',
                  md: 'translateY(53px)'
                },
                opacity: { xs: '0.3', md: 1 }
              }}
            >
              <Image
                src={OnboardingIcon}
                alt='icon'
                style={{
                  height: '100%',
                  width: '250px'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <OnboardingQuestions />
      )}
    </Grid>
  );
};

export default Onboarding;
