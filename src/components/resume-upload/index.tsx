'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';

import CloudIcon from '@/assets/upload-icon.svg';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/navigation';

import { Heading, UploadContainer, Uploader } from './styles';
import { useDispatch, useSelector } from '@/redux/store';
import { uploadResume } from '@/actions/resume';
import { enqueueSnackbar } from 'notistack';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';
import ResumeParsing1 from '@/assets/resume-parsing-1.png';
import ResumeParsing2 from '@/assets/resume-parsing-2.png';
import ResumeParsing3 from '@/assets/resume-parsing-3.png';

const quotes = [
  `Until we extract your details, Google this out - "Daisuki Desu"`,

  `Baby thana tha lega, tu abhi resume banane mei focus kr`,

  `If this website doesn't work out for you, consider opening onlyfans`
];

const ResumeUpload = ({ onCompleteUpload }: { onCompleteUpload: Function }) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [quoteNumber, setQuoteNumber] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const { resumeParseCompleted, errors } = useSelector(
    state => state.onboarding
  );

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
    if (event?.dataTransfer?.files[0]?.type !== 'application/pdf') return;
    if (inputRef?.current) inputRef.current.files = event?.dataTransfer?.files;
    setFiles(event?.dataTransfer?.files);
  };

  const handleCancel = () => {
    setFiles(null);
  };

  const timeToTake = 80; // in seconds
  const moveIn = 1000; // in ms

  const getQuote = () => {
    return (
      <>
        {[...Array(quotes.length)].map(
          (_, ind) =>
            quoteNumber === ind && (
              <Typewriter
                key={ind}
                onInit={typewriter => {
                  typewriter
                    .typeString(quotes[quoteNumber] + '.')
                    .deleteChars(1)
                    .start();
                }}
                options={{
                  cursor: '|',
                  delay: 30,
                  devMode: false
                }}
              />
            )
        )}
      </>
    );
  };

  useEffect(() => {
    let intervalId: any;
    if (files) {
      const formData = new FormData();
      formData.append('resume', files[0]);
      dispatch(uploadResume({ formData }));

      intervalId = setInterval(() => {
        setProgress(prog => {
          const newProg =
            prog + Math.floor((100 / timeToTake) * (moveIn / 1000));

          return newProg;
        });
      }, moveIn);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [files, route]);

  useEffect(() => {
    if (progress >= 100 && resumeParseCompleted) {
      onCompleteUpload();
    } else if (resumeParseCompleted) {
      setTimeout(() => {
        setProgress(100);
      }, 200);
    }
  }, [progress, resumeParseCompleted]);

  useEffect(() => {
    if (errors) {
      enqueueSnackbar('Error, Please try again...', { variant: 'error' });
      handleCancel();
      dispatch(clearOnboardingErrors());
    }
  }, [errors]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteNumber(curr => Math.min(quotes.length - 1, curr + 1));
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid>
      <UploadContainer width={'100%'}>
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type='file'
          accept='application/pdf'
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
            <Heading fontSize='32px'>Select a PDF file to upload</Heading>
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
            height={'280px'}
            gap='10px'
          >
            <Typography
              fontWeight={'500'}
              fontSize={'18px'}
              textAlign={'center'}
              height={'53px'}
            >
              {getQuote()}
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

            <Image
              src={ResumeParsing1}
              alt=''
              style={{ width: '180px', height: '180px' }}
            />
          </Grid>
        )}
      </UploadContainer>
      <Typography textAlign='center' mt='5px' lineHeight={'14px'}>
        Or{' '}
        <Typography
          component='span'
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => onCompleteUpload()}
        >
          Create a new resume
        </Typography>
      </Typography>
    </Grid>
  );
};

export default ResumeUpload;
