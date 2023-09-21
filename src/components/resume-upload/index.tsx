'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';

import CloudIcon from '@/assets/upload-icon.svg';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/navigation';

import { Heading, UploadContainer, Uploader } from './styles';

const ResumeUpload = () => {
  const route = useRouter();
  const [files, setFiles] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e?.target?.files);
  };

  const handleDrag = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (inputRef?.current) inputRef.current.files = event?.dataTransfer?.files;
    setFiles(event?.dataTransfer?.files);
  };

  const handleCancel = () => {
    setFiles(null);
  };

  const timeToTake = 5; // in seconds
  const moveIn = 200; // in ms

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prog => {
        const newProg = prog + Math.floor((100 / timeToTake) * (moveIn / 1000));
        if (newProg > 100) {
          clearInterval(intervalId);
          route.push('/job-description');
          return 100;
        }
        return newProg;
      });
    }, moveIn);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <UploadContainer width={'100%'}>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type='file'
        onChange={handleInputChange}
      />
      {!files ? (
        <Uploader
          onClick={() => inputRef?.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Image src={CloudIcon} alt='cloud-icon' />
          <Heading fontSize='32px'>Select a PDF / DOC file to upload</Heading>
          <Typography
            sx={{
              color: '#FFFFFFCC',
              fontSize: '20px',
              fontWeight: '300'
            }}
          >
            or drag and drop it here
          </Typography>
        </Uploader>
      ) : (
        <Grid
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
          gap='20px'
        >
          <Typography fontWeight={'500'} fontSize={'18px'} textAlign={'center'}>
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString('Collecting data from your resume' + '.')
                  .deleteChars(1)
                  .start()
                  .callFunction(() => {
                    // setAllowUserToType(true);
                    // setShowOptions(true);
                  });
              }}
              options={{
                cursor: '|',
                delay: 50,
                devMode: false
              }}
            />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant='determinate'
                value={progress}
                sx={{
                  width: '100%',
                  height: '8px',
                  background: '#FFFFFF33',
                  borderRadius: '10px',
                  '& span': {
                    background: 'white',
                    borderRadius: '10px'
                  }
                }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant='body2' color='white'>{`${Math.round(
                progress
              )}%`}</Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </UploadContainer>
  );
};

export default ResumeUpload;
