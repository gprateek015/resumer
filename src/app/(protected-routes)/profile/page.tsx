'use client';

import React, { useContext, useEffect } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { DnDBackendContext, useDispatch, useSelector } from '@/redux/store';

import PersonalOverviewDetails from '@/components/profile-details/personal-overview';
import { DndProvider } from 'react-dnd';
import SkillsContainer from '@/components/profile-details/skills';

import ProfileEducations from './components/educations';
import ProfileExperiences from './components/experiences';
import ProfileProjects from './components/projects';
import ProfileLinksContainer from '@/components/profile-details/profile-links';
import { righteous, space_grotest } from '@/font-family';
import { fetchEductions } from '@/actions/education';
import { fetchExperiences } from '@/actions/experience';
import { fetchProjects } from '@/actions/project';
import { updateUser } from '@/actions/user';
import { Skill, User } from '@/types';
import { AuthButton } from '@/components/navbar/styles';
import CertificationsContainer from '@/components/profile-details/certifications';
import { FormLabel } from '@/components/onboarding-questions/styles';

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
  const Backend = useContext(DnDBackendContext);

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
        height: 'calc(100vh - 70px)',
        maxHeight: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <DndProvider backend={Backend}>
        <FormProvider {...methods}>
          <Grid
            sx={{
              my: '20px',
              px: { xs: '20px', sm: '100px', lg: '200px' },
              width: '100%'
            }}
            className={space_grotest.className}
          >
            <Grid
              sx={{
                maxWidth: '950px',
                maxHeight: 'calc(100vh - 90px)',
                height: '100%'
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '10px',
                  px: '10px',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    background:
                      'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
                    color: 'transparent',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    fontFamily: righteous.style.fontFamily
                  }}
                >
                  My Profile
                </Typography>
                <AuthButton
                  variant='contained'
                  onClick={handleSubmit(onSave)}
                  sx={{
                    padding: '4px 20px',
                    borderRadius: '20px',
                    boxShadow: '',
                    '&:hover': {
                      boxShadow:
                        '0px 0px 15px 0px rgba(244, 244, 244, 0.48) inset'
                    }
                  }}
                >
                  Save
                </AuthButton>
              </Grid>
              <Grid
                sx={{
                  borderRadius: '24px',
                  // background: 'rgba(255, 255, 255, 0.10)',
                  border: '1px solid #ffffff87',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  width: '100%',
                  flexDirection: { xs: 'column', md: 'row' },
                  height: { md: '85%' }
                }}
              >
                <Grid
                  sx={{
                    flexGrow: 1,
                    flexBasis: '50%',
                    padding: '15px 25px 25px',
                    overflow: { xs: 'visible', md: 'auto' },
                    borderRight: '1px solid #ffffff87',
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
                  <FormLabel mb='5px'>Skills</FormLabel>
                  <SkillsContainer />
                  <Divider
                    sx={{
                      borderColor: '#ffffff87',
                      my: '20px'
                    }}
                  />
                  <FormLabel mb='5px'>Certificates</FormLabel>
                  <CertificationsContainer />
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
                    overflow: { xs: 'visible', md: 'auto' },
                    padding: '15px 25px 25px',

                    '&::-webkit-scrollbar': {
                      display: 'none'
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                  }}
                >
                  <FormLabel
                    sx={{
                      fontSize: '18px',
                      mb: '10px'
                    }}
                  >
                    Educations
                  </FormLabel>
                  <ProfileEducations />
                  <Divider
                    sx={{
                      borderColor: '#ffffff87',
                      my: '20px'
                    }}
                  />
                  <FormLabel
                    sx={{
                      fontSize: '18px',
                      mb: '10px'
                    }}
                  >
                    Experiences
                  </FormLabel>
                  <ProfileExperiences />
                  <Divider
                    sx={{
                      borderColor: '#ffffff87',
                      my: '20px'
                    }}
                  />
                  <FormLabel
                    sx={{
                      fontSize: '18px',
                      mb: '10px'
                    }}
                  >
                    Projects
                  </FormLabel>
                  <ProfileProjects />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
      </DndProvider>
    </Grid>
  );
};

export default Profile;
