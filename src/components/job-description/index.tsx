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
  const route = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const getResumeData = async () => {
    setLoading(true);
    await dispatch(generateResumeData({ jobDescription }));
    setLoading(false);
    route.push('/workbench');
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
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography textAlign='center'>
            Please enter job description below
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={12}
            hidden
            placeholder='Start typing in here'
            inputProps={{
              sx: {
                background: 'white',
                padding: '7px 10px',
                height: '300px',
                border: '1px solid #E9E9E9',
                borderRadius: '4px',
                lineHeight: '20px',
                marginBottom: '10px'
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
              width: '90%'
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
                width: '155px',
                letterSpacing: '1px'
              }}
            >
              Generate Resume
            </Typography>
          </Button>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            width: '100%'
          }}
        >
          <Grid>
            <Typography sx={{ marginTop: '10px' }} textAlign='center'>
              ----- Or -----
            </Typography>
            <Image
              src={icon}
              alt='icon'
              style={{
                height: '350px',
                width: '350px',
                marginTop: '5%'
              }}
              priority={true}
            />
          </Grid>
          <Grid
            sx={{
              width: { xs: '360px', md: '340px' },
              height: '400px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.10)',
              backdropFilter: 'blur(20px)',
              padding: '20px',
              marginLeft: '5%'
            }}
          >
            <Typography
              style={{
                marginBottom: 40
              }}
              fontSize={16}
              textAlign='center'
            >
              Do you have a job ID then please provide the details below
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
            <Button
              sx={{
                borderRadius: '10px',
                border: '1px solid #FFF',
                background: '#FFF',
                padding: '10px',
                marginTop: '40px'
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
                  width: '155px',
                  letterSpacing: '1px'
                }}
              >
                Generate Resume
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DescriptionForm;
