import { deleteProject, postProject, updateProject } from '@/actions/project';
import ProjectDetailDesign from '@/components/projects/detail';
import { ProjectData } from '@/components/projects/edit';
import { clearError } from '@/redux/slice/user';
import { useDispatch, useSelector } from '@/redux/store';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileProjects = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  const projects = watch('projects');
  const { error } = useSelector(state => state.user);

  const apiError = useMemo(() => {
    let apierror;
    try {
      apierror = JSON.parse(error || '');
    } catch (_) {
      apierror = error;
    }
    return apierror;
  }, [error]);

  const onSubmit: SubmitHandler<ProjectData> = async data => {
    if (editId && editId !== 'new')
      await dispatch(
        updateProject({
          data: { ...data, _id: undefined, id: undefined, user_id: undefined },
          id: editId
        })
      );
    else await dispatch(postProject(data));
    dispatch(clearError());
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (projects?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [projects]);

  return (
    <ProjectDetailDesign
      projects={projects || []}
      handleDelete={handleDelete}
      editId={editId}
      setEditId={setEditId}
      onSubmit={onSubmit}
      apiError={apiError}
    />
  );
};

export default ProfileProjects;
