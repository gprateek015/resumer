'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button, FormInput, FormLabel } from '../onboarding-questions/styles';
import { useDispatch, useSelector } from '@/redux/store';
import { postReview } from '@/actions/review';
import { enqueueSnackbar } from 'notistack';
import { righteous, space_grotest } from '@/font-family';
import { closeBugDialog } from '@/redux/slice/user';

const width = '300px';
const height = '263px';

const ReviewBoxDialog = () => {
  const dispatch = useDispatch();
  const { isBugDialogOpen: open } = useSelector(state => state.user);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    setLoading(true);
    if (description) {
      const res = await dispatch(postReview({ description }));
      if (res.type === 'post/review/fulfilled') {
        setDescription('');
        enqueueSnackbar('Successfully submitted your feedback', {
          variant: 'success'
        });
        dispatch(closeBugDialog());
      }
    } else {
      enqueueSnackbar('Please type in your feedback', { variant: 'warning' });
    }
    setLoading(false);
  };

  return (
    <Grid
      sx={{
        width,
        height,
        position: 'absolute',
        background: 'white',
        display: open ? 'flex' : 'none',
        top: `-${height}`,
        // left: `-${width}`,
        right: '20px',
        backgroundColor: 'black',
        flexDirection: 'column',
        p: '20px',
        borderRadius: '20px',
        gap: '20px'
      }}
      className={space_grotest.className}
    >
      <Box>
        <FormLabel fontSize={'20px'} fontFamily={righteous.style.fontFamily}>
          Please give your feedback!
        </FormLabel>
        <FormInput
          multiline
          sx={{
            '& .MuiInputBase-root': {
              p: '0px'
            }
          }}
          rows={4}
          placeholder='Enter your review here...'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Box>

      <Button
        sx={{
          borderRadius: '10px',
          border: '1px solid #FFF',
          padding: '10px'
        }}
        onClick={submitReview}
      >
        {loading ? (
          <CircularProgress
            sx={{
              width: '24px !important',
              height: '24px !important',
              color: 'white'
            }}
          />
        ) : (
          <Typography
            sx={{
              background:
                'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}
          >
            Submit
          </Typography>
        )}
      </Button>
    </Grid>
  );
};

export default ReviewBoxDialog;
