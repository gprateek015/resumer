import { Experience } from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from '../onboarding-questions/styles';
import { SubmitHandler } from 'react-hook-form';
import WorkExpEdit from './edit';

const WorkExpDetailDesign = ({
  experiences = [],
  handleDelete,
  editId,
  setEditId,
  onSubmit,
  apiError
}: {
  experiences: Experience[];
  handleDelete: Function;
  editId?: string | null;
  setEditId: Function;
  onSubmit: SubmitHandler<Experience>;
  apiError?: string | object | null;
}) => {
  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Grid>
        {experiences?.map?.(experience => (
          <Box key={experience._id}>
            {editId === experience._id ? (
              <WorkExpEdit
                handleCancel={handleCancel}
                onSubmit={onSubmit}
                buttonText='Save'
                apiError={apiError}
                experience={experience}
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
                    {experience.mode === 'onsite' && `- ${experience.location}`}
                  </Typography>
                </Grid>
                <Grid display={'flex'} gap='20px' mt='10px'>
                  <Button
                    sx={{ flexBasis: '50%' }}
                    onClick={() => setEditId(experience._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ flexBasis: '50%' }}
                    onClick={() => handleDelete(experience._id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        ))}
        {editId === 'new' && (
          <WorkExpEdit
            handleCancel={handleCancel}
            onSubmit={onSubmit}
            buttonText='Add experience'
            apiError={apiError}
          />
        )}
      </Grid>
      {editId !== 'new' && (
        <Button onClick={() => setEditId('new')}>Add New Experience</Button>
      )}
    </Grid>
  );
};

export default WorkExpDetailDesign;
