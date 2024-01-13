'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { Heading, Button, PageNavButton } from './styles';
import { deleteExperience, fetchExperiences } from '@/actions/experience';
import { RootState, useDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import WorkExperienceEdit from './work-experience-edit';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';

const WorkExperienceDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { experiences } = useSelector((state: RootState) => state.onboarding);
  const [editId, setEditId] = useState<string | undefined | null>(null);

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteExperience(id));
  };

  useEffect(() => {
    if (experiences?.length) {
      setEditId('');
    } else {
      setEditId('new');
    }
  }, [experiences]);

  useEffect(() => {
    dispatch(fetchExperiences());
  }, []);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Heading mb='20px'>
        Share your internship/ <br />
        work experience with us
      </Heading>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <Grid>
          {experiences?.map?.(experience => (
            <Box key={experience.id}>
              {editId === experience.id ? (
                <WorkExperienceEdit
                  value={experience}
                  handleCancel={handleCancel}
                />
              ) : (
                <Grid
                  sx={{
                    border: '1px solid white',
                    p: '10px',
                    borderRadius: '5px',
                    mb: '15px'
                  }}
                >
                  <Grid
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      mr='20px'
                      sx={{
                        fontSize: '16px'
                      }}
                    >
                      {experience.company_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '12px'
                      }}
                    >
                      {experience.start_date}&nbsp;-&nbsp;
                      {experience.end_date}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      mr='20px'
                      sx={{
                        fontSize: '12px'
                      }}
                    >
                      {experience.position}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '12px'
                      }}
                    >
                      {experience.mode}
                      {experience.mode === 'onsite' &&
                        `- ${experience.location}`}
                    </Typography>
                  </Grid>
                  <Grid display={'flex'} gap='20px' mt='10px'>
                    <Button
                      sx={{ flexBasis: '50%' }}
                      onClick={() => setEditId(experience.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ flexBasis: '50%' }}
                      onClick={() => handleDelete(experience.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          ))}
          {editId === 'new' && (
            <WorkExperienceEdit handleCancel={handleCancel} />
          )}
        </Grid>
        {editId !== 'new' && (
          <Button onClick={() => setEditId('new')}>Add New Experience</Button>
        )}
      </Grid>
    </PageContainer>
  );
};

export default WorkExperienceDetails;
