'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import profile from '@/assets/onboarding1.png';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '@/redux/store';

import PersonalOverviewDetails from '@/components/profile-details/personal-overview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SkillsContainer from '@/components/profile-details/skills';

import ProfileEducations from './components/educations';
import ProfileExperiences from './components/experiences';
import ProfileProjects from './components/projects';
import ProfileLinksContainer from '@/components/profile-details/profile-links';
import { righteous } from '@/font-family';
import { fetchEductions } from '@/actions/education';
import { fetchExperiences } from '@/actions/experience';
import { fetchProjects } from '@/actions/project';
import { updateUser } from '@/actions/user';
import { Skill, User } from '@/types';

type ProfileUserData = User & {
  technical_skills?: { name: string }[];
  core_subjects?: { name: string }[];
  dev_tools?: { name: string }[];
  languages?: { name: string }[];
};

const Profile = () => {
  const methods = useForm();
  const dispatch = useDispatch();
  const { reset, setValue, handleSubmit } = methods;

  const {
    data: userData,
    experiences,
    projects,
    educations
  } = useSelector(state => state.user);

  const onSave = (data: ProfileUserData) => {
    const { technical_skills, core_subjects, dev_tools, languages } = data;
    let skills: { name: string; type: Skill['type'] }[] = [];
    technical_skills?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'technical_skills'
      });
    });
    core_subjects?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'core_subjects'
      });
    });
    dev_tools?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'dev_tools'
      });
    });
    languages?.forEach(skill => {
      skills.push({
        name: skill.name,
        type: 'languages'
      });
    });

    dispatch(updateUser({ ...data, skills }));
  };

  useEffect(() => {
    reset({
      ...userData,
      ...userData?.skills,
      skills: undefined,
      educations,
      experiences,
      projects
    });
  }, [userData]);

  useEffect(() => {
    setValue('educations', educations);
  }, [educations]);
  useEffect(() => {
    setValue('experiences', experiences);
  }, [experiences]);
  useEffect(() => {
    setValue('projects', projects);
  }, [projects]);

  useEffect(() => {
    dispatch(fetchEductions());
    dispatch(fetchExperiences());
    dispatch(fetchProjects());
  }, []);

  return (
    <Grid
      sx={{
        width: '100vw',
        height: 'calc(100vh - 100px)',
        maxHeight: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <FormProvider {...methods}>
          <Grid
            sx={{
              my: '50px',
              px: { xs: '20px', md: '200px' },
              width: '100%',
              height: '100%'
            }}
            className={righteous.className}
          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: '10px',
                px: '10px'
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px'
                }}
              >
                My Profile
              </Typography>
              <Button variant='contained' onClick={handleSubmit(onSave)}>
                Save
              </Button>
            </Grid>
            <Grid
              sx={{
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                width: '100%',
                flexDirection: { xs: 'column', md: 'row' }
              }}
            >
              <Grid
                sx={{
                  flexGrow: 1,
                  flexBasis: '50%',
                  padding: '25px',
                  maxHeight: { xs: 'auto', md: 'calc(100vh - 200px)' },
                  height: { xs: 'auto', md: 'calc(100vh - 200px)' },
                  overflow: { xs: 'visible', md: 'auto' },
                  borderRight: '1px solid rgba(255, 255, 255, 0.14)',
                  borderWidth: { xs: '0px', md: '1px' },

                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
                }}
              >
                <PersonalOverviewDetails />
                <Divider
                  sx={{
                    borderColor: '#ffffff87',
                    my: '20px'
                  }}
                />
                <Typography mb='5px'>Skills</Typography>
                <SkillsContainer />
                <Divider
                  sx={{
                    borderColor: '#ffffff87',
                    my: '20px'
                  }}
                />
                <ProfileLinksContainer />
              </Grid>

              <Grid
                sx={{
                  flexGrow: 1,
                  flexBasis: '50%',
                  maxHeight: { xs: 'auto', md: 'calc(100vh - 200px)' },
                  height: { xs: 'auto', md: 'calc(100vh - 200px)' },
                  overflow: { xs: 'visible', md: 'auto' },
                  padding: '25px',

                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '18px',
                    mb: '10px'
                  }}
                >
                  Educations
                </Typography>
                <ProfileEducations />
                <Divider
                  sx={{
                    borderColor: '#ffffff87',
                    my: '20px'
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '18px',
                    mb: '10px'
                  }}
                >
                  Experiences
                </Typography>
                <ProfileExperiences />
                <Divider
                  sx={{
                    borderColor: '#ffffff87',
                    my: '20px'
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '18px',
                    mb: '10px'
                  }}
                >
                  Projects
                </Typography>
                <ProfileProjects />
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
      </DndProvider>
    </Grid>
  );
};

export default Profile;
