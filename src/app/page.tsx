import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

import { Righteous } from 'next/font/google';

import Login from '@/components/auth/login';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

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
          width: '100%'
        }}
      >
        <Grid
          sx={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            padding: '50px 0px',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography fontSize={'66px'} lineHeight={'80px'}>
              Improve your <br /> CV Attractiveness <br /> Using AI
            </Typography>
            <Typography
              fontSize={'25px'}
              lineHeight={'35px'}
              color='rgba(232, 235, 243, 0.70)'
            >
              Lorem ipsum dolor sit amet consectetur congue libero nec aliquam
              posuere mattis laoreet sit odio pharetra lectus non ornare dis.
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
                32K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Artworks
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={'30px'} lineHeight={'20px'}>
                20K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Auction
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={'30px'} lineHeight={'20px'}>
                10K+
              </Typography>
              <Typography fontSize={'20px'} color='rgba(255, 255, 255, 0.48)'>
                Artists
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Login />
      </Grid>
    </Grid>
  );
}
