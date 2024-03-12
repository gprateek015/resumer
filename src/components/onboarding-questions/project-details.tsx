import React, { useEffect, useMemo, useState } from 'react';

import { Heading } from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { RootState, useDispatch, useSelector } from '@/redux/store';
import ProjectDetailDesign from '../projects/detail';
import { ProjectData } from '../projects/edit';
import {
  addProject,
  deleteProject,
  updateOnboardingData,
  updateProjectOnb
} from '@/redux/slice/onboarding';
import validateProject from '@/schema/project';
import { useSnackbar } from 'notistack';
import { Project } from '@/types';
import { Grid } from '@mui/material';
import ShortUniqueId from 'short-unique-id';

const ProjectDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const uid = new ShortUniqueId({ length: 5 });

  const {
    data: { projects }
  } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | null>(null);
  const [trySaving, setTrySaving] = useState(false); // For navigating without with editId !== null
  const [navigateTo, setNavigateTo] = useState<null | Function>(null);

  const onSubmit = (data: ProjectData) => {
    setTrySaving(false);

    if (editId && editId !== 'new')
      dispatch(
        updateProjectOnb({
          data: { ...data },
          id: editId
        })
      );
    else dispatch(addProject({ ...data, _id: uid.rnd() }));

    navigateTo?.();
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteProject({ id }));
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
      setTrySaving(true);
      setNavigateTo(() => navigate);
    } else {
      navigate();
    }
  };

  const updateProjects = (projects: Project[]) => {
    dispatch(updateOnboardingData({ projects }));
  };

  useEffect(() => {
    if (projects?.length) {
      setEditId(null);
    }
  }, [projects]);

  useEffect(() => {
    if (!editId) {
      setTrySaving(false);
    }
  }, [editId]);

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
            trySaving={trySaving}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProjectDetails;
