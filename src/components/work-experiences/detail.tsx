import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Experience } from '@/types';
import { Box, Grid, Icon, Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../onboarding-questions/styles';
import WorkExpEdit from './edit';
import validateExperience from '@/schema/experience';

import ExperienceBox from './experience-box';
import DragableElement from '../dragable-element';

const WorkExpDetailDesign = ({
  experiences = [],
  handleDelete,
  editId,
  setEditId,
  onSubmit,
  updateExperiences,
  apiError,
  errors = {}
}: {
  experiences: Experience[];
  handleDelete: Function;
  editId?: string | null;
  setEditId: Function;
  onSubmit: SubmitHandler<Experience>;
  updateExperiences?: (exps: Experience[]) => void;
  apiError?: string | object | null;
  errors?: any;
}) => {
  const errorIds = Object.keys(errors);

  const handleCancel = () => {
    setEditId(null);
  };
  const handleEdit = (id: string) => {
    setEditId(id);
  };

  const moveExperience = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      let updatedList = [...experiences];
      const [movedItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, movedItem);

      updateExperiences?.(updatedList);
      return;
    },
    [experiences]
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
      {experiences?.map?.((experience, ind) => (
        <Box key={ind}>
          {editId === experience._id ? (
            <WorkExpEdit
              handleCancel={handleCancel}
              onSubmit={onSubmit}
              buttonText='Save'
              apiError={
                errorIds.includes(experience._id as string)
                  ? errors[experience._id as string]
                  : apiError
              }
              experience={experience}
            />
          ) : updateExperiences ? (
            <DndProvider backend={HTML5Backend}>
              <DragableElement
                index={ind}
                moveObject={moveExperience}
                renderItem={(ref, grabbing) => (
                  <ExperienceBox
                    ref={ref}
                    experience={experience}
                    errorIds={errorIds}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    grabbing={grabbing}
                  />
                )}
              />
            </DndProvider>
          ) : (
            <ExperienceBox
              experience={experience}
              errorIds={errorIds}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </Box>
      ))}
      {editId === 'new' && (
        <WorkExpEdit
          handleCancel={handleCancel}
          onSubmit={onSubmit}
          buttonText='Add experience'
          apiError={apiError}
        />
      )}
      {editId !== 'new' && (
        <Button onClick={() => handleEdit('new')}>Add New Experience</Button>
      )}
    </Grid>
  );
};

export default WorkExpDetailDesign;
