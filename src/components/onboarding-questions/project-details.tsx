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

const ProjectDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { errors: apiErrors } = useSelector(
    (state: RootState) => state.onboarding
  );
  const [apiError, setApiError] = useState<string | object | null>(null);
  const { projects } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | null>(null);

  const onSubmit = async (data: ProjectData) => {
    setApiError(null);

    if (editId && editId !== 'new')
      await dispatch(
        updateProject({
          data: { ...data, _id: undefined, user_id: undefined },
          id: editId
        })
      );
    else await dispatch(postProject(data));
  };

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteProject(id));
  };

  useEffect(() => {
    setApiError(apiErrors);
  }, [apiErrors]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Heading mb='20px'>
        Please provide us with <br />
        your projects
      </Heading>
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
