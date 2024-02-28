import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Experience, ProfileLink } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import ProjectDetailDesign from '@/components/projects/detail';
import {
  Button,
  FormInput,
  FormLabel
} from '@/components/onboarding-questions/styles';
import { firstLetterCapital } from '@/utils';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';

const ProfileLinksContainer = () => {
  const { register } = useFormContext();

  const {
    fields: profileLinks,
    append,
    remove
  } = useFieldArray({
    name: 'profile_links'
  });

  return (
    <Grid
      sx={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'column'
      }}
    >
      <Typography>Profile Links for the Header Section</Typography>
      <Box>
        <FormLabel>Github</FormLabel>
        <FormInput
          {...register('github')}
          placeholder='https://github.com/username'
        />
      </Box>
      <Box>
        <FormLabel>LinkedIn</FormLabel>
        <FormInput
          {...register('linkedin')}
          placeholder='https://linkedin.com/in/username'
        />
      </Box>
      <Box>
        <FormLabel>Portfolio</FormLabel>
        <FormInput
          {...register('portfolio')}
          placeholder='https://yourname.com'
        />
      </Box>
      <Box>
        <FormLabel>Twitter</FormLabel>
        <FormInput
          {...register('twitter')}
          placeholder='https://twitter.com/username'
        />
      </Box>

      <Typography>
        Other Profile Links{' '}
        <Typography
          component={'span'}
          sx={{
            fontSize: '12px'
          }}
        >
          (For Profile Links Section)
        </Typography>
      </Typography>

      {profileLinks?.map((profileLink: any, ind: number) => (
        <Box display={'flex'} gap='10px' key={profileLink.id} mb='10px'>
          <FormInput
            {...register(`profile_links.${ind}.name`)}
            placeholder='Codeforces'
            sx={{
              flexBasis: '30%'
            }}
          />
          <FormInput
            {...register(`profile_links.${ind}.link`)}
            placeholder='https://codeforces.com/username'
            sx={{
              flexGrow: '1'
            }}
          />
          <IconButton
            sx={{
              color: 'white',
              border: '1px solid #ffffff87',
              borderRadius: '3px'
            }}
            onClick={() => remove(ind)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Box>
        <Button
          startIcon={<AddIcon />}
          fullWidth
          onClick={() =>
            append({
              name: '',
              link: ''
            })
          }
        >
          Add another profile link
        </Button>
      </Box>
    </Grid>
  );
};

export default ProfileLinksContainer;
