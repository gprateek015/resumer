'use client';

import React, { MouseEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReviewBoxDialog from './review-dialog';
import { righteous, space_grotest } from '@/font-family';
import { Heading } from '../onboarding-questions/styles';
import { useDispatch, useSelector } from '@/redux/store';
import { closeBugDialog, openBugDialog } from '@/redux/slice/user';

const ReviewBox = () => {
  const dispatch = useDispatch();
  const { isBugDialogOpen } = useSelector(state => state.user);
  const toggleBugDialog = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isBugDialogOpen) dispatch(closeBugDialog());
    else dispatch(openBugDialog());
  };

  return (
    <Grid
      sx={{
        position: 'fixed',
        right: '0px',
        bottom: { xs: '5px', md: '10px' }
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
          pr: { xs: '20px', md: '40px' },
          pl: '20px',
          py: { xs: '5px', md: '10px' }
        }}
        onClick={toggleBugDialog}
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
      <ReviewBoxDialog />
    </Grid>
  );
};

export default ReviewBox;
