import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

import AuthBox from '@/components/auth';
import { poppins, righteous } from '@/font-family';

export default function Home() {
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
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'normal' }
        }}
      >
        <Grid
          sx={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            padding: '50px 0px',
            justifyContent: 'space-between',
            height: { xs: '100vh', md: 'auto' },
            alignItems: 'center'
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
          <AuthBox />
        </Grid>
      </Grid>
    </Grid>
  );
}
