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
        width: '100%',
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
            width: 'fit-content',
            height: 'fit-content',
            borderRadius: '20px',
            padding: '0px 30px 0px 10px'
          }}
        >
          <Typography
            mt='20px'
            fontSize={'26px'}
            fontWeight={'400'}
            className={righteous.className}
          >
            Welcome to Resume.AI!
          </Typography>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              width: 'fit-content',
              height: 'fit-content'
            }}
          >
            <Chatbot setShowQuestions={setShowQuestions} />
            <Grid sx={{ alignSelf: 'flex-end' }}>
              <Image
                src={OnboardingIcon}
                alt='icon'
                style={{
                  height: '520px',
                  width: '350px',
                  transform: 'translateY(60px)'
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
