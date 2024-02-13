import { Education } from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Button } from '../onboarding-questions/styles';
import EducationalDetailsEdit, { EducationData } from './edit';
import { SubmitHandler } from 'react-hook-form';

const EduDetailDesign = ({
  educations = [],
  editId,
  setEditId,
  handleDelete,
  onSubmit,
  apiError
}: {
  educations: Education[];
  editId: string | null;
  setEditId: Function;
  handleDelete: Function;
  onSubmit: SubmitHandler<EducationData>;
  apiError?: string | object | null;
}) => {
  const handleCancel = () => setEditId(null);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      {educations.map(education => (
        <Box key={education._id}>
          {editId === education._id ? (
            <EducationalDetailsEdit
              handleCancel={handleCancel}
              education={education}
              onSubmit={onSubmit}
              buttonText='Save'
              apiError={apiError}
            />
          ) : (
            <Grid
              sx={{
                border: '1px solid white',
                p: '10px',
                borderRadius: '5px'
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
                  {education.institute_name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px'
                  }}
                >
                  {education.start_year as string}&nbsp;-&nbsp;
                  {education.end_year as string}
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
                  sx={{
                    fontSize: '12px'
                  }}
                >
                  {['graduation', 'post_graduation'].includes(
                    education.level as string
                  )
                    ? education.degree
                    : education.level}
                  {[
                    'senior_secondary',
                    'diploma',
                    'graduation',
                    'post_graduation'
                  ].includes(education?.level as string) &&
                    `- ${education.specialisation}`}
                </Typography>
                <Typography>
                  {education.scoring_type}&nbsp;{education.score}
                  &nbsp;/&nbsp;
                  {education.maximum_score}
                </Typography>
              </Grid>
              <Grid display={'flex'} gap='20px' mt='10px'>
                <Button
                  sx={{ flexBasis: '50%' }}
                  onClick={() => setEditId(education._id)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ flexBasis: '50%' }}
                  onClick={() => handleDelete(education._id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      ))}
      {editId === 'new' && (
        <EducationalDetailsEdit
          handleCancel={handleCancel}
          onSubmit={onSubmit}
          buttonText='Add Education'
          apiError={apiError}
        />
      )}
      {editId !== 'new' && (
        <Button onClick={() => setEditId('new')}>Add New Education</Button>
      )}
    </Grid>
  );
};

export default EduDetailDesign;
