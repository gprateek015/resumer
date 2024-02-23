import React, { useEffect, useState } from 'react';

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
import { addProject, updateProjectOnb } from '@/redux/slice/onboarding';

const ProjectDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
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
          data: { ...data, _id: undefined, id: undefined, user_id: undefined },
          id: editId
        })
      );
    else dispatch(addProject(data));
  };

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteProject(id));
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
    } else {
      setEditId('new');
    }
  }, [projects]);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Heading mb='20px'>Please provide us with your projects</Heading>
      <ProjectDetailDesign
        projects={projects}
        editId={editId}
        setEditId={setEditId}
        handleDelete={handleDelete}
        apiError={apiError}
        onSubmit={onSubmit}
      />
    </PageContainer>
  );
};

export default ProjectDetails;
