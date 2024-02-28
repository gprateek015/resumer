import { Project } from '@/types';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Chip, Grid, Icon, Typography } from '@mui/material';
import { Button } from '../onboarding-questions/styles';
import ProjectEdit, { ProjectData } from './edit';
import { SubmitHandler } from 'react-hook-form';
import validateProject from '@/schema/project';
import ErrorIcon from '@mui/icons-material/Error';
import ProjectBox from './project-box';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragableElement from '../dragable-element';

const ProjectDetailDesign = ({
  projects = [],
  editId,
  setEditId,
  handleDelete,
  onSubmit,
  updateProjects,
  apiError,
  errors = {}
}: {
  projects: Project[];
  editId: string | null;
  setEditId: Function;
  handleDelete: Function;
  onSubmit: SubmitHandler<ProjectData>;
  updateProjects?: Function;
  apiError?: string | object | null;
  errors?: any;
}) => {
  const handleCancel = () => {
    setEditId(null);
  };
  const handleEdit = (id: string) => {
    setEditId(id);
  };

  const errorIds = Object.keys(errors);

  const moveProject = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      let updatedList = [...projects];
      const [movedItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, movedItem);

      updateProjects?.(updatedList);
      return;
    },
    [projects]
  );

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%'
      }}
    >
      {projects.map((project, ind) => (
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
          ) : updateProjects ? (
            <DndProvider backend={HTML5Backend}>
              <DragableElement
                index={ind}
                moveObject={moveProject}
                renderItem={(ref, grabbing) => (
                  <ProjectBox
                    ref={ref}
                    project={project}
                    errorIds={errorIds}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    grabbing={grabbing}
                  />
                )}
              />
            </DndProvider>
          ) : (
            <ProjectBox
              project={project}
              errorIds={errorIds}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
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
