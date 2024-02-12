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
    state => state.user.data
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
    let skills: { name: string; type: Skill['type'] }[] = [];
    data.technical_skills?.forEach((skill: Skill) => {
      skills.push({
        name: skill.name,
        type: 'technical_skills'
      });
    });
    data.core_subjects?.forEach((skill: Skill) => {
      skills.push({
        name: skill.name,
        type: 'core_subjects'
      });
    });
    data.dev_tools?.forEach((skill: Skill) => {
      skills.push({
        name: skill.name,
        type: 'dev_tools'
      });
    });
    data.languages?.forEach((skill: Skill) => {
      skills.push({
        name: skill.name,
        type: 'languages'
      });
    });
    await dispatch(updateUser({ achievements: data.achievements, skills }));
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
        <Heading mb='20px'>Share your Skills & Achievements</Heading>
        <DndProvider backend={HTML5Backend}>
          <FormLabel mb='10px'>Select Your Skills</FormLabel>
          <SkillsContainer />
        </DndProvider>
        <Divider
          sx={{
            borderColor: '#ffffff90',
            my: '20px'
          }}
        />
        <Grid>
          <FormLabel mb='10px'>Add Your Achievements</FormLabel>
          {achievements?.map((ach, ind: number) => (
            <Box key={ach.id} display={'flex'} gap='10px' mb='10px'>
              <FormInput
                {...register(`achievements.${ind}`)}
                placeholder='Tasks you did in your internship/job'
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
          <Button
            onClick={() => append('')}
            sx={{
              background: 'transparent'
            }}
            startIcon={<AddIcon />}
            fullWidth
          >
            Add another point
          </Button>
        </Grid>
      </FormProvider>
    </PageContainer>
  );
};

export default AchievementsSkills;
