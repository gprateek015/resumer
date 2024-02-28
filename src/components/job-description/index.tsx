'use client';

import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Backdrop
} from '@mui/material';
import icon from '@/assets/onboarding7.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from '@/redux/store';
import { generateResumeData } from '@/actions/resume';

const DescriptionForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const getResumeData = async () => {
    setLoading(true);
    await dispatch(generateResumeData({ jobDescription }));
    router.push('/workbench');
  };

  return (
    <>
      {loading && (
        <Backdrop
          open={loading}
          sx={{
            zIndex: '10'
          }}
        >
          <CircularProgress sx={{ color: 'white' }} />
        </Backdrop>
      )}
      <Grid
        sx={{
          width: { xs: '360px', md: '900px' },
          minHeight: '350px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.10)',
          backdropFilter: 'blur(20px)',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          MsOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        <Image
          src={icon}
          alt='icon'
          style={{
            height: '250px',
            width: '250px'
          }}
          priority={true}
        />
        <Grid
          sx={{
            width: { xs: '360px', md: '100%' },
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography>Paste in your job description here</Typography>
          <TextField
            fullWidth
            multiline
            rows={9}
            placeholder='Start typing in here'
            inputProps={{
              sx: {
                background: 'transparent',
                padding: '7px 10px',
                border: '1px solid #E9E9E9',
                borderRadius: '4px',
                lineHeight: '20px',
                color: 'white'
              }
            }}
            onChange={e => setJobDescription(e.target.value)}
          />
          <Button
            sx={{
              borderRadius: '10px',
              border: '1px solid #FFF',
              background: '#FFF',
              padding: '10px',
              width: '95%'
            }}
            fullWidth
            onClick={() => getResumeData()}
          >
            <Typography
              sx={{
                background:
                  'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '1px'
              }}
            >
              Generate Resume
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DescriptionForm;
