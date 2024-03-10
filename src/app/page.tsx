import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

import AuthBox from '@/components/auth';
import { poppins, righteous, space_grotest } from '@/font-family';

export default function Home() {
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
              Improve your Resume ATS score Using AI
            </Typography>
            <Typography
              fontSize='1.4rem'
              lineHeight='1.8rem'
              color='rgba(232, 235, 243, 0.70)'
              sx={{
                display: { xs: 'none', sm: 'block' }
              }}
              fontWeight='600'
            >
              Let AI do the heavy lifting for you in optimizing your resumes
              when you apply for various job roles
            </Typography>
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
