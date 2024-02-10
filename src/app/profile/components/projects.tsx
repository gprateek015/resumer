import { deleteProject } from '@/actions/project';
import ProjectDetailDesign from '@/components/projects/detail';
import { ProjectData } from '@/components/projects/edit';
import { useDispatch } from '@/redux/store';
import React, { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileProjects = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  const projects = watch('projects');

  const onSubmit: SubmitHandler<ProjectData> = data => {
    // const newData = {
    //   ...data,
    //   _id: uid.rnd()
    // };
    // if (editId === 'new') {
    //   setValue('projects', [...projects, newData]);
    // } else {
    //   setValue(
    //     'projects',
    //     projects.map((project: Project) => {
    //       if (project._id === editId) {
    //         return newData;
    //       }
    //       return project;
    //     })
    //   );
    // }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
  };

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
