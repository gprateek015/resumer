'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';

import AuthBox from '@/components/auth';
import { poppins, righteous, space_grotest } from '@/font-family';

export default function Home() {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [leftDistance, setLeftDistance] = useState(0);
  useEffect(() => {
    setLeftDistance(subtitleRef?.current?.getBoundingClientRect().left || 0);
  }, [subtitleRef]);
  return (
    <Grid
      display={'flex'}
      alignItems={'center'}
      flexGrow={1}
      className={space_grotest.className}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'normal' },
          overflowY: 'hidden',
          padding: { xs: '0px 10px', md: '0px 50px' },
          gap: '50px'
        }}
      >
        <Grid
          sx={{
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            padding: { sm: '50px 0px' },
            height: { md: 'auto' },
            maxHeight: { md: 'auto' },
            justifyContent: { xs: 'space-between', md: 'flex-start' },
            textAlign: { xs: 'center', sm: 'start' }
          }}
        >
          <Box>
            <Typography
              fontSize={{ xs: '2rem', sm: '3rem' }}
              lineHeight={'1.2em'}
              marginBottom={{ xs: '15px', sm: '30px' }}
              fontWeight='700'
            >
              Improve Your Resume ATS Score Using AI
            </Typography>
            <Box
              sx={{
                position: 'relative'
              }}
              ref={subtitleRef}
            >
              <Typography
                sx={{
                  fontSize: '1.2rem',
                  lineHeight: '1.4rem',
                  color: 'white',
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: '600',
                  position: 'absolute',
                  left: `-${leftDistance}px`,
                  pl: `${leftDistance}px`,
                  backdropFilter: 'blur(20px)',
                  borderRadius: '0px 50px 50px 0px',
                  py: '14px',
                  background: 'rgba(255, 255, 255, 0.10)'
                }}
              >
                Let AI do the heavy lifting for you in optimizing your resumes
                when you apply for various job roles
              </Typography>
            </Box>
          </Box>
          <Grid
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: { xs: '30px', sm: '60px' },
              marginTop: { sm: '20%' }
            }}
            className={righteous.className}
          >
            <Box>
              <Typography
                fontSize={{ xs: '1.4em', sm: '2em' }}
                lineHeight={'20px'}
              >
                12K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Downloads
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={{ xs: '1.4em', sm: '2em' }}
                lineHeight={'20px'}
              >
                20K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Visits
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={{ xs: '1.4em', sm: '2em' }}
                lineHeight={'20px'}
              >
                10+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Templates
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          className={poppins.className}
          sx={{
            height: { md: 'auto' },
            display: 'flex',
            alignItems: 'center',
            mt: { xs: '10px', sm: '0px' }
          }}
        >
          <AuthBox />
        </Grid>
      </Grid>
    </Grid>
  );
}
