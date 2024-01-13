import React, { useEffect, useState } from 'react';
import { Box, Chip, Grid, Typography } from '@mui/material';

import {
  Button,
  FormInput,
  FormLabel,
  Heading,
  Option,
  Options,
  PageNavButton
} from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { useDispatch, useSelector } from '@/redux/store';
import { deleteProject, fetchProjects } from '@/actions/project';
import ProjectDetailsEdit from './project-details-edit';

const ProjectDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | undefined | null>(null);

  const handleCancel = () => setEditId(null);

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (projects?.length) {
      setEditId('');
    } else {
      setEditId('new');
    }
  }, [projects]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Heading mb='20px'>
        Please provide us with <br />
        your projects
      </Heading>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        {projects.map(project => (
          <Box key={project.id}>
            {project.id === editId ? (
              <ProjectDetailsEdit handleCancel={handleCancel} value={project} />
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
                        project.code_url ||
                          project.live_url ||
                          project.video_url
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
                    onClick={() => setEditId(project.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ flexBasis: '50%' }}
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default ProjectDetails;
