'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';

import SendIcon from '@/assets/icons/send-icon.svg';
import { ChatTypography, OptionTypography } from './styles';
import ResumeUpload from '../resume-upload';
import { useDispatch, useSelector } from '@/redux/store';
import { updateUser } from '@/actions/user';

const Chatbot = ({ setShowQuestions }: { setShowQuestions: Function }) => {
  const dispatch = useDispatch();
  const {
    data: { name, _id }
  } = useSelector(state => state.user);

  const [chats, setChats] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [allowUserToType, setAllowUserToType] = useState(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [aiChatsInd, setAiChatsInd] = useState(0);
  const [resumeUpload, setResumeUpload] = useState<boolean>(false);

  const AiChats = useMemo(() => {
    setShowOptions(false);
    if (!_id) return [];
    return [
      {
        message: `Hello ${
          name?.split(' ')[0] ?? 'there'
        }, Let's embark on the adventure of crafting your outstanding resume! To initiate the process, could you kindly provide us with your name?`,
        options: [
          {
            label: `${name}`,
            value: 'profile_name'
          },
          {
            label: 'Choose a different one',
            value: 'new_name'
          }
        ]
      },
      {
        message: 'Please help us with your name',
        options: [
          {
            label: `${name}`,
            value: 'profile_name'
          }
        ]
      },
      {
        message:
          "Perfect, Let's get the things rolling. Would you like to import your existing resume or create one from scratch",
        options: [
          {
            label: 'Import resume',
            value: 'import_resume'
          },
          {
            label: 'Create a brand new resume',
            value: 'create_new'
          }
        ]
      }
    ];
  }, [_id]);

  const handleOptionChoose = (option?: (typeof AiChats)[0]['options'][0]) => {
    switch (option?.value) {
      case 'profile_name':
        handleClick(option.label, 2);
        break;
      case 'new_name':
        setChats(chats => [
          ...chats,
          option.label,
          AiChats[aiChatsInd + 1]?.message
        ]);
        setAiChatsInd(curr => curr + 1);
        setAllowUserToType(true);
        break;
      case 'import_resume':
        handleClick(option.label);
        break;
      case 'create_new':
        setShowQuestions(true);
        break;
    }
    setShowOptions(false);
  };

  const handleClick = (optionValue?: string, nextChatInd?: number) => {
    const newMsg = optionValue || inputText;
    if (inputText) {
      dispatch(updateUser({ name: inputText }));
    }
    setChats(chats => [...chats, newMsg]);
    setInputText('');
    setAllowUserToType(false);
    setTimeout(() => {
      if (newMsg.toLowerCase() === 'import resume') setResumeUpload(true);
      if ((nextChatInd || aiChatsInd + 1) >= AiChats.length) return;
      setChats(chats => [
        ...chats,
        AiChats[nextChatInd || aiChatsInd + 1]?.message
      ]);
      setAiChatsInd(nextChatInd || aiChatsInd + 1);
    }, 500);
  };

  useEffect(() => {
    if (AiChats.length > 0) {
      setChats([AiChats[0]?.message]);
    }
  }, [AiChats]);

  return (
    <Grid
      sx={{
        width: { xs: '360px', md: '400px' },
        borderRadius: '20px',
        padding: { xs: '25px 15px', md: '25px 25px 0px' },
        transform: 'translateY(8px)',
        alignSelf: 'flex-end',
        marginBottom: '10px'
      }}
    >
      {resumeUpload ? (
        <ResumeUpload onCompleteUpload={() => setShowQuestions(true)} />
      ) : (
        <Grid
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
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
              padding: '10px 10px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '16px',
              // maxHeight: '300px',
              height: { xs: '275px', md: '300px' },
              overflow: 'hidden',
              textAlign: 'start'
            }}
          >
            {chats.map((chat, ind) => (
              <Box key={ind}>
                {ind === chats.length - 1 && ind % 2 === 0 ? (
                  <ChatTypography ind={ind} component='div'>
                    <Typewriter
                      onInit={typewriter => {
                        typewriter
                          .typeString(chat + '.')
                          .deleteChars(1)
                          .start()
                          .callFunction(() => setShowOptions(true));
                      }}
                      options={{
                        cursor: '|',
                        delay: 30,
                        devMode: false
                      }}
                    />
                  </ChatTypography>
                ) : (
                  <ChatTypography ind={ind}>{chat}</ChatTypography>
                )}
              </Box>
            ))}
            {showOptions && (
              <Grid
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {AiChats[aiChatsInd]?.options?.map((option, ind: number) => (
                  <OptionTypography
                    label={option.label}
                    onClick={() => handleOptionChoose(option)}
                    key={ind}
                  />
                ))}
              </Grid>
            )}
          </Grid>
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              padding: '0px 10px'
            }}
          >
            <TextField
              fullWidth
              placeholder={!allowUserToType ? 'Disabled...' : 'Type here...'}
              inputProps={{
                sx: {
                  background: 'white',
                  padding: '7px 10px',
                  height: '20px',
                  border: '1px solid #E9E9E9',
                  borderRadius: '4px',
                  lineHeight: '20px',
                  flexGrow: 1
                }
              }}
              onKeyDownCapture={e => {
                if (e.key === 'Enter') {
                  handleClick();
                  setShowOptions(false);
                }
              }}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={!allowUserToType}
            />
            <IconButton
              sx={{
                background:
                  'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
                borderRadius: '4px',
                opacity: !inputText ? '0.6' : '1',
                aspectRatio: '1',
                width: '36px',
                height: '36px'
              }}
              onClick={() => {
                handleClick();
                setShowOptions(false);
              }}
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
