import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Experience, ProfileLink } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import ProjectDetailDesign from '@/components/projects/detail';
import { FormInput } from '@/components/onboarding-questions/styles';
import { firstLetterCapital } from '@/utils';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';

const ProfileLinks = ({
  collapsed,
  toggleCollapse
}: {
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  const { register } = useFormContext();

  const {
    fields: profileLinks,
    append,
    remove
  } = useFieldArray({
    name: 'profile_links'
  });

  return (
    <Grid>
      <Heading
        title='Profile Links'
        icon={<SchoolIcon />}
        collapsed={collapsed}
        toggleCollapse={() => toggleCollapse()}
      />

      {!collapsed && (
        <Grid
          sx={{
            borderRadius: '0px 0px 20px 20px',
            background: 'rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(20px)',
            padding: '10px 15px 25px 15px',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column'
          }}
        >
          <Box>
            <Typography>Github</Typography>
            <FormInput
              {...register('github')}
              placeholder='https://github.com/username'
            />
          </Box>
          <Box>
            <Typography>LinkedIn</Typography>
            <FormInput
              {...register('linkedin')}
              placeholder='https://linkedin.com/in/username'
            />
          </Box>
          <Box>
            <Typography>Portfolio</Typography>
            <FormInput
              {...register('portfolio')}
              placeholder='https://yourname.com'
            />
          </Box>
          <Box>
            <Typography>Twitter</Typography>
            <FormInput
              {...register('twitter')}
              placeholder='https://twitter.com/username'
            />
          </Box>

          <Typography>Other Profile Links</Typography>

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
                  border: '1px solid white',
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
      )}
    </Grid>
  );
};

export default ProfileLinks;
