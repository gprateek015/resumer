import { Project } from '@/types';
import { Chip, Grid, Icon, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from '../onboarding-questions/styles';
import { righteous } from '@/font-family';

type Props = {
  project: Project;
  errorIds: string[];
  handleEdit: (id: string) => void;
  handleDelete: Function;
  grabbing?: boolean;
};

const ProjectBox = React.forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const {
      project,
      errorIds,
      handleDelete,
      handleEdit,
      grabbing = false
    } = props;
    return (
      <Grid
        sx={{
          border: '1px solid #ffffff87',
          p: '10px',
          borderRadius: '5px',
          position: 'relative',
          borderColor: errorIds.includes(project._id as string)
            ? '#7e73f6'
            : '#ffffff87',
          cursor: grabbing ? 'grabbing' : 'grab'
        }}
        ref={ref}
      >
        {errorIds.includes(project._id as string) && (
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
          className={righteous.className}
        >
          <Typography
            mr='20px'
            sx={{
              fontSize: '16px'
            }}
          >
            {project.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() =>
              window.open(
                project.code_url || project.live_url || project.video_url
              )
            }
          >
            {project.code_url && 'Code Url'}
            {project.live_url && 'Live Url'}
            {project.video_url && 'Video Url'}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            my: '10px'
          }}
        >
          {project.skills_required?.map((skill, ind) => (
            <Chip
              label={skill}
              key={ind}
              sx={{
                color: 'white',
                border: '1px solid white'
              }}
            />
          ))}
        </Grid>
        <Grid
          display={'flex'}
          gap='20px'
          mt='10px'
          className={righteous.className}
        >
          <Button
            sx={{ flexBasis: '50%' }}
            onClick={() => handleEdit(project._id as string)}
          >
            Edit
          </Button>
          <Button
            sx={{ flexBasis: '50%' }}
            onClick={() => handleDelete(project._id)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    );
  }
);

ProjectBox.displayName = 'ProjectBox';

export default ProjectBox;
