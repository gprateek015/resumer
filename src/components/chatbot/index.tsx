'use client';

import React, { useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import OnboardingIcon from '@/assets/onboarding.png';

import SendIcon from '@/assets/icons/send-icon.svg';
import { ChatTypography, OptionTypography } from './styles';
import ResumeUpload from '../resume-upload';

const AiChats = [
  {
    message:
      "Hello Prateek, Let's embark on the adventure of crafting your outstanding resume! To initiate the process, could you kindly provide us with your name?",
    options: ['Prateek Goyal', 'Choose a different one']
  },
  {
    message:
      "Perfect, Let's get the things rolling. Would you like to import your existing resume or create one from scratch",
    options: ['Import resume', 'Create a brand new resume']
  }
];

const Chatbot = () => {
  const [chats, setChats] = useState<string[]>([AiChats[0]?.message]);
  const [text, setText] = useState<string>('');
  const [allowUserToType, setAllowUserToType] = useState(false);
  const [aiChatsInd, setAiChatsInd] = useState(0);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [resumeUpload, setResumeUpload] = useState<boolean>(false);

  const handleClick = (msg?: string) => {
    const newMsg = msg || text;
    setChats(chats => [...chats, newMsg]);
    setText('');
    setAllowUserToType(false);
    setTimeout(() => {
      if (newMsg === 'Import resume') setResumeUpload(true);
      if (aiChatsInd + 1 >= AiChats.length) return;
      setChats(chats => [...chats, AiChats[aiChatsInd + 1]?.message]);
      setAiChatsInd(curr => curr + 1);
    }, 1000);
  };

  return (
    <Grid
      sx={{
        width: { xs: '360px', md: '400px' },
        height: '500px',
        borderRadius: '20px',
        padding: '26px'
      }}
    >
      {' '}
      {resumeUpload ? (
        <ResumeUpload />
      ) : (
        <Grid
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
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
              flexGrow: 1,
              padding: '10px 0px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '16px'
            }}
          >
            {chats.map((chat, ind) => (
              <ChatTypography ind={ind} key={ind}>
                {ind === chats.length - 1 &&
                ind % 2 === 0 &&
                !allowUserToType ? (
                  <Typewriter
                    onInit={typewriter => {
                      typewriter
                        .typeString(chat + '.')
                        .deleteChars(1)
                        .start()
                        .callFunction(() => {
                          setAllowUserToType(true);
                          setShowOptions(true);
                        });
                    }}
                    options={{
                      cursor: '|',
                      delay: 50,
                      devMode: false
                    }}
                  />
                ) : (
                  chat
                )}
              </ChatTypography>
            ))}
            {showOptions && (
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px'
                }}
              >
                {AiChats[aiChatsInd]?.options?.map(
                  (option: string, ind: number) => (
                    <OptionTypography
                      label={option}
                      onClick={e => {
                        // setText((e.target as any).innerText);
                        handleClick((e.target as any).innerText);
                        setShowOptions(false);
                      }}
                      key={ind}
                    />
                  )
                )}
              </Grid>
            )}
          </Grid>
          <Grid
            width={'100%'}
            sx={{
              display: 'flex',
              gap: '10px'
            }}
          >
            <TextField
              fullWidth
              placeholder='Type here'
              inputProps={{
                sx: {
                  background: 'white',
                  padding: '7px 10px',
                  height: '20px',
                  border: '1px solid #E9E9E9',
                  borderRadius: '4px',
                  lineHeight: '20px'
                }
              }}
              onKeyDownCapture={e => e.key === 'Enter' && handleClick()}
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={!allowUserToType}
            />
            <IconButton
              sx={{
                background:
                  'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
                borderRadius: '4px',
                opacity: !text ? '0.6' : '1',
                aspectRatio: '1',
                width: '36px',
                height: '36px'
              }}
              onClick={() => handleClick()}
            >
              <Image src={SendIcon} alt='sned-icon' />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Chatbot;
