import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Experience, Project } from '@/types';
import ProjectDetailDesign from '@/components/projects/detail';
import { ProjectData } from '@/components/projects/edit';
import ShortUniqueId from 'short-unique-id';

const Projects = ({
  collapsed,
  toggleCollapse,
  reloadResume
}: {
  collapsed: boolean;
  toggleCollapse: Function;
  reloadResume: SubmitHandler<any>;
}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch, handleSubmit } = useFormContext();
  const projects = watch('projects');
  const uid = new ShortUniqueId({ length: 5 });

  const onSubmit: SubmitHandler<ProjectData> = data => {
    const newData = {
      ...data,
      _id: uid.rnd()
    };

    if (editId === 'new') {
      setValue('projects', [...projects, newData]);
    } else {
      setValue(
        'projects',
        projects.map((project: Project) => {
          if (project._id === editId) {
            return newData;
          }
          return project;
        })
      );
    }
    handleSubmit(reloadResume)();
  };

  const handleDelete = (id: string) => {
    setValue(
      'projects',
      projects.filter((exp: Experience) => exp._id !== id)
    );
  };

  useEffect(() => {
    if (projects?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [projects]);

  return (
    <Grid>
      <Heading
        title='Projects'
        icon={<SchoolIcon />}
        collapsed={collapsed}
        toggleCollapse={() => toggleCollapse()}
      />

      {!collapsed && (
        <Grid
          sx={{
            borderRadius: '0px 0px 20px 20px',
            background: 'rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(20px)',
            padding: '25px 15px'
          }}
        >
          <ProjectDetailDesign
            projects={projects}
            handleDelete={handleDelete}
            editId={editId}
            setEditId={setEditId}
            onSubmit={onSubmit}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Projects;
