import { Box, Divider, Grid, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import PageContainer from './page-container';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '@/redux/store';
import { updateOnboardingData } from '@/redux/slice/onboarding';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormInput, FormLabel, Heading } from './styles';
import { space_grotest } from '@/font-family';
import CertificationsContainer from '../profile-details/certifications';

const AchievementsAndCertificates = ({
  nextPage,
  prevPage
}: {
  nextPage: Function;
  prevPage: Function;
}) => {
  const methods = useForm();
  const dispatch = useDispatch();
  const { register, control, handleSubmit, setValue } = methods;
  const {
    skills,
    achievements: prevAchievements,
    certificates
  } = useSelector(state => state.onboarding.data);

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
        certificates: data.certificates
      })
    );

    nextPage();
  };

  useEffect(() => {
    setValue('achievements', prevAchievements);
  }, [prevAchievements]);

  useEffect(() => {
    setValue('certificates', certificates);
  }, [certificates]);

  return (
    <PageContainer nextPage={handleSubmit(onSubmit)} prevPage={prevPage}>
      <FormProvider {...methods}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Heading mb='20px'>Share your Achievements & Certificates</Heading>
          <Grid
            sx={{
              backdropFilter: 'blur(20px)',
              p: '20px',
              borderRadius: '20px',
              border: '1px solid #ffffff87',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1
            }}
            className={space_grotest.className}
          >
            <Grid>
              <FormLabel mb='5px'>Add Your Achievements</FormLabel>
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

            <Divider
              sx={{
                borderColor: '#ffffff87',
                my: '20px'
              }}
            />

            <Grid>
              <FormLabel mb='5px'>Add Your Certificates</FormLabel>
              <CertificationsContainer />
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </PageContainer>
  );
};

export default AchievementsAndCertificates;
