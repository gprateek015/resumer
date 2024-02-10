import { deleteProject, postProject, updateProject } from '@/actions/project';
import ProjectDetailDesign from '@/components/projects/detail';
import { ProjectData } from '@/components/projects/edit';
import { useDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileProjects = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  const projects = watch('projects');

  const onSubmit: SubmitHandler<ProjectData> = async data => {
    if (editId && editId !== 'new')
      await dispatch(
        updateProject({
          data: { ...data, _id: undefined, id: undefined, user_id: undefined },
          id: editId
        })
      );
    else await dispatch(postProject(data));
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
    />
  );
};

export default ProfileProjects;
