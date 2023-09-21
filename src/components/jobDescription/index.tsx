'use client';

import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import icon from '@/assets/profile.png';
import Image from 'next/image';

const DescriptionForm = () => {
  return (
    <Grid
      sx={{
        width: { xs: '360px', md: '1100px' },
        height: '450px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(20px)',
        padding: '26px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        MsOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      <Grid
        sx={{
          width: { xs: '360px', md: '500px' },
          height: '400px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.10)',
          backdropFilter: 'blur(20px)',
          padding: '12px'
        }}
      >
        <Typography textAlign='center'>Enter job description below</Typography>
        <TextField
          fullWidth
          multiline
          rows={15}
          hidden
          placeholder='Start typing in here'
          inputProps={{
            sx: {
              background: 'white',
              padding: '7px 10px',
              height: '400px',
              border: '1px solid #E9E9E9',
              borderRadius: '4px',
              lineHeight: '20px',
              marginBottom: '30px'
            }
          }}
        />
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          width: '100%'
        }}
      >
        <Grid
          sx={{
            padding: '40px'
          }}
        >
          <Typography
            style={{
              marginBottom: 40
            }}
            fontSize={26}
          >
            Or if you have a job ID then please enter here
          </Typography>
          <Typography paddingBottom={1}>Enter company name</Typography>
          <TextField
            fullWidth
            placeholder='Google'
            inputProps={{
              sx: {
                background: 'white',
                padding: '7px 10px',
                height: '30px',
                border: '1px solid #E9E9E9',
                borderRadius: '4px',
                lineHeight: '20px',
                marginBottom: '30px'
              }
            }}
          />
          <Typography paddingBottom={1}>Enter job ID</Typography>
          <TextField
            fullWidth
            placeholder='hireme'
            inputProps={{
              sx: {
                background: 'white',
                padding: '7px 10px',
                height: '30px',
                border: '1px solid #E9E9E9',
                borderRadius: '4px',
                lineHeight: '20px'
              }
            }}
          />
        </Grid>
        <Grid>
          <Image
            src={icon}
            alt='icon'
            style={{
              height: '350px',
              width: '350px',
              marginTop: '5%',
              marginLeft: '10%'
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DescriptionForm;
