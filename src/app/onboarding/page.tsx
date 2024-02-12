'use client';

import Chatbot from '@/components/chatbot';
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import OnboardingIcon from '@/assets/onboarding2.png';

import { Righteous } from 'next/font/google';
import OnboardingQuestions from '@/components/onboarding-questions';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

const Onboarding = () => {
  const [showQuestions, setShowQuestions] = useState<boolean>(!false);
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
            position: 'relative'
          }}
        >
          <Typography
            fontSize={'1.5rem'}
            fontWeight={'400'}
            className={righteous.className}
          >
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
            <Chatbot setShowQuestions={setShowQuestions} />
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
                  md: 'translateY(60px)'
                }
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
