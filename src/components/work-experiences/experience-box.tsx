import { Experience } from '@/types';
import { Grid, Icon, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from '../onboarding-questions/styles';

type Props = {
  experience: Experience;
  errorIds: string[];
  handleEdit: (id: string) => void;
  handleDelete: Function;
  grabbing?: boolean;
};

const ExperienceBox = React.forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const {
      experience,
      errorIds,
      handleEdit,
      handleDelete,
      grabbing = false
    } = props;

    return (
      <Grid
        sx={{
          border: '1px solid #ffffff87',
          p: '10px',
          borderRadius: '5px',
          position: 'relative',
          borderColor: errorIds.includes(experience._id as string)
            ? '#7e73f6'
            : '#ffffff87',
          cursor: grabbing ? 'grabbing' : 'grab'
        }}
        ref={ref}
      >
        {errorIds.includes(experience._id as string) && (
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
            onClick={() => handleEdit(experience._id as string)}
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
    );
  }
);

ExperienceBox.displayName = 'ExperienceBox';

export default ExperienceBox;
