'use client';

import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReviewBoxDialog from './review-dialog';
import { righteous, space_grotest } from '@/font-family';
import { Heading } from '../onboarding-questions/styles';

const ReviewBox = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      sx={{
        position: 'fixed',
        right: '0px',
        bottom: '10px'
      }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          // background: 'white',
          background: 'rgba(255, 255, 255, 0.10)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px 0px 0px 20px',
          pr: '40px',
          pl: '20px',
          py: '10px'
        }}
        onClick={() => setOpen(curr => !curr)}
      >
        <Typography
          fontFamily={space_grotest.style.fontFamily}
          sx={{
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Report a bug
        </Typography>
        {/* <Avatar
          src=''
          alt='icon'
          sx={{
            width: '30px',
            height: '30px'
          }}
        /> */}
      </Box>
      <ReviewBoxDialog open={open} onClose={onClose} />
    </Grid>
  );
};

export default ReviewBox;
