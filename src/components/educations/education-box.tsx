import { Education } from '@/types';
import { Grid, Icon, Typography } from '@mui/material';
import React from 'react';
import { Button } from '../onboarding-questions/styles';
import ErrorIcon from '@mui/icons-material/Error';

type Props = {
  education: Education;
  errorIds: string[];
  handleEdit: (id: string) => void;
  handleDelete: Function;
  grabbing?: boolean;
};

const EducationBox = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    errorIds,
    education,
    handleEdit,
    handleDelete,
    grabbing = false
  } = props;

  return (
    <Grid
      sx={{
        border: '1px solid white',
        p: '10px',
        borderRadius: '5px',
        position: 'relative',
        borderColor: errorIds.includes(education._id as string)
          ? '#7e73f6'
          : 'white',
        cursor: grabbing ? 'grabbing' : 'grab'
      }}
      ref={ref}
    >
      {errorIds.includes(education._id as string) && (
        <Icon
          sx={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            color: '#669ced'
          }}
        >
          <ErrorIcon />
        </Icon>
      )}
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
          {['graduation', 'post_graduation'].includes(education.level as string)
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
          onClick={() => handleEdit(education._id as string)}
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
  );
});

export default EducationBox;
