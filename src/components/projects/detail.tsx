import { Project } from '@/types';
import React, { useEffect, useMemo } from 'react';
import { Box, Chip, Grid, Icon, Typography } from '@mui/material';
import { Button } from '../onboarding-questions/styles';
import ProjectEdit, { ProjectData } from './edit';
import { SubmitHandler } from 'react-hook-form';
import validateProject from '@/schema/project';
import ErrorIcon from '@mui/icons-material/Error';

const ProjectDetailDesign = ({
  projects = [],
  editId,
  setEditId,
  handleDelete,
  onSubmit,
  apiError,
  errors = {}
}: {
  projects: Project[];
  editId: string | null;
  setEditId: Function;
  handleDelete: Function;
  onSubmit: SubmitHandler<ProjectData>;
  apiError?: string | object | null;
  errors?: any;
}) => {
  const handleCancel = () => {
    setEditId(null);
  };

  const errorIds = Object.keys(errors);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      {projects.map(project => (
        <Box key={project._id}>
          {project._id === editId ? (
            <ProjectEdit
              handleCancel={handleCancel}
              project={project}
              onSubmit={onSubmit}
              buttonText='Save'
              apiError={
                errorIds.includes(project._id as string)
                  ? errors[project._id as string]
                  : apiError
              }
            />
          ) : (
            <Grid
              sx={{
                border: '1px solid white',
                p: '10px',
                borderRadius: '5px',
                position: 'relative',
                borderColor: errorIds.includes(project._id as string)
                  ? '#7e73f6'
                  : 'white'
              }}
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
              <Grid display={'flex'} gap='20px' mt='10px'>
                <Button
                  sx={{ flexBasis: '50%' }}
                  onClick={() => setEditId(project._id)}
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
          )}
        </Box>
      ))}
      {editId === 'new' && (
        <ProjectEdit
          handleCancel={handleCancel}
          onSubmit={onSubmit}
          buttonText='Add project'
          apiError={apiError}
        />
      )}
      {editId !== 'new' && (
        <Button onClick={() => setEditId('new')}>Add New Project</Button>
      )}
    </Grid>
  );
};

export default ProjectDetailDesign;
