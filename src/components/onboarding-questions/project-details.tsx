import React, { useEffect, useMemo, useState } from 'react';

import { Heading } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { RootState, useDispatch, useSelector } from '@/redux/store';
import {
  deleteProject,
  fetchProjects,
  postProject,
  updateProject
} from '@/actions/project';
import ProjectDetailDesign from '../projects/detail';
import { ProjectData } from '../projects/edit';
import {
  addProject,
  updateOnboardingData,
  updateProjectOnb
} from '@/redux/slice/onboarding';
import validateProject from '@/schema/project';
import { useSnackbar } from 'notistack';
import { Project } from '@/types';
import { Grid } from '@mui/material';

const ProjectDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { errors: apiErrors } = useSelector(
    (state: RootState) => state.onboarding
  );
  const [apiError, setApiError] = useState<string | object | null>(null);
  const {
    data: { projects }
  } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | null>(null);

  const onSubmit = (data: ProjectData) => {
    setApiError(null);

    if (editId && editId !== 'new')
      dispatch(
        updateProjectOnb({
          data: { ...data },
          id: editId
        })
      );
    else dispatch(addProject(data));
  };

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteProject(id));
  };

  const errors = useMemo(() => {
    const data: any = {};
    projects.forEach(project => {
      const resp = validateProject(project);
      if (resp.error?.details) {
        const errors: any = {};
        resp.error.details.forEach(
          (err: any) =>
            (errors[err.path[0]] = { message: err.message, type: err.type })
        );
        data[project._id as string] = errors;
      }
    });
    return data;
  }, [projects]);

  const onNavigation = (navigate: Function) => {
    const errorIds = Object.keys(errors);
    if (errorIds.length !== 0) {
      enqueueSnackbar({
        message: 'Error in work experiences',
        variant: 'error',
        preventDuplicate: true
      });
    } else if (editId !== null) {
      enqueueSnackbar({
        message: 'Either cancel or save the changes',
        variant: 'warning',
        preventDuplicate: true
      });
    } else {
      navigate();
    }
  };

  const updateProjects = (projects: Project[]) => {
    dispatch(updateOnboardingData({ projects }));
  };

  useEffect(() => {
    setApiError(apiErrors);
  }, [apiErrors]);

  // useEffect(() => {
  //   dispatch(fetchProjects());
  // }, []);

  useEffect(() => {
    if (projects?.length) {
      setEditId(null);
    }
    // else {
    //   setEditId('new');
    // }
  }, [projects]);

  return (
    <PageContainer
      nextPage={() => onNavigation(nextPage)}
      prevPage={() => onNavigation(prevPage)}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Heading mb='20px'>Please provide us with your projects</Heading>

        <Grid
          sx={{
            backdropFilter: 'blur(20px)',
            p: '20px',
            borderRadius: '20px',
            border: '1px solid #ffffff87',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1
          }}
        >
          <ProjectDetailDesign
            projects={projects}
            editId={editId}
            setEditId={setEditId}
            handleDelete={handleDelete}
            updateProjects={updateProjects}
            errors={errors}
            onSubmit={onSubmit}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProjectDetails;
