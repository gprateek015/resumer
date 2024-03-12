import React, { useEffect } from 'react';
import PageContainer from './page-container';
import SkillsContainer from '../profile-details/skills';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Divider, Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from '@/redux/store';
import { Button, FormInput, FormLabel, Heading } from './styles';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Skill } from '@/types';
import { updateUser } from '@/actions/user';
import { updateOnboardingData } from '@/redux/slice/onboarding';
import { space_grotest } from '@/font-family';

const AchievementsSkills = ({
  nextPage,
  prevPage
}: {
  nextPage: Function;
  prevPage: Function;
}) => {
  const methods = useForm();
  const dispatch = useDispatch();
  const { register, control, handleSubmit, setValue } = methods;
  const { skills, achievements: prevAchievements } = useSelector(
    state => state.onboarding.data
  );

  const {
    fields: achievements,
    append,
    remove
  } = useFieldArray({
    name: 'achievements',
    control
  });

  const onSubmit = async (data: any) => {
    dispatch(
      updateOnboardingData({
        achievements: data.achievements,
        skills: {
          technical_skills: data.technical_skills,
          core_subjects: data.core_subjects,
          dev_tools: data.dev_tools,
          languages: data.languages
        }
      })
    );

    nextPage();
  };

  useEffect(() => {
    setValue('achievements', prevAchievements);

    Object.keys(skills || {}).forEach((key: any) => {
      setValue(key, skills?.[key as Skill['type']]);
    });
  }, [prevAchievements, skills]);

  return (
    <PageContainer nextPage={handleSubmit(onSubmit)} prevPage={prevPage}>
      <FormProvider {...methods}>
        <Heading mb='20px'>Share your Skills</Heading>

        <Grid
          sx={{
            backdropFilter: 'blur(20px)',
            p: '20px',
            borderRadius: '20px',
            border: '1px solid #ffffff87',
            display: 'flex',
            flexDirection: 'column'
          }}
          className={space_grotest.className}
        >
          <DndProvider backend={HTML5Backend}>
            <FormLabel mb='5px'>Select Your Skills</FormLabel>
            <SkillsContainer />
          </DndProvider>
        </Grid>
      </FormProvider>
    </PageContainer>
  );
};

export default AchievementsSkills;
