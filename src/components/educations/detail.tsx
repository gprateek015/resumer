import { Education } from '@/types';
import { Box, Grid, Icon, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Button } from '../onboarding-questions/styles';
import EducationalDetailsEdit, { EducationData } from './edit';
import { SubmitHandler } from 'react-hook-form';
import validateEducation from '@/schema/education';
import ErrorIcon from '@mui/icons-material/Error';
import EducationBox from './education-box';
import { DndProvider } from 'react-dnd';
import DragableElement from '../dragable-element';
import { space_grotest } from '@/font-family';
import { DnDBackendContext } from '@/redux/store';

const EduDetailDesign = ({
  educations = [],
  editId,
  setEditId,
  handleDelete,
  onSubmit,
  updateEducations,
  apiError,
  errors = {},
  trySaving
}: {
  educations: Education[];
  editId: string | null;
  setEditId: Function;
  handleDelete: Function;
  onSubmit: SubmitHandler<EducationData>;
  updateEducations?: Function;
  apiError?: string | object | null;
  errors?: any;
  trySaving?: boolean;
}) => {
  const handleCancel = () => setEditId(null);
  const handelEdit = (id: string) => setEditId(id);
  const Backend = useContext(DnDBackendContext);

  const errorIds = Object.keys(errors);

  const moveEducation = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      let updatedList = [...educations];
      const [movedItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, movedItem);

      updateEducations?.(updatedList);
      return;
    },
    [educations]
  );

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%'
      }}
      className={space_grotest.className}
    >
      {educations.map((education, ind) => (
        <Box key={education._id}>
          {editId === education._id ? (
            <EducationalDetailsEdit
              handleCancel={handleCancel}
              education={education}
              onSubmit={onSubmit}
              buttonText='Save'
              apiError={
                errorIds.includes(education._id as string)
                  ? errors[education._id as string]
                  : apiError
              }
              trySaving={trySaving}
            />
          ) : updateEducations ? (
            <DndProvider backend={Backend}>
              <DragableElement
                index={ind}
                moveObject={moveEducation}
                renderItem={(ref, grabbing) => (
                  <EducationBox
                    ref={ref}
                    education={education}
                    errorIds={errorIds}
                    handleDelete={handleDelete}
                    handleEdit={handelEdit}
                    grabbing={grabbing}
                  />
                )}
              />
            </DndProvider>
          ) : (
            <EducationBox
              education={education}
              errorIds={errorIds}
              handleDelete={handleDelete}
              handleEdit={handelEdit}
            />
          )}
        </Box>
      ))}
      {editId === 'new' && (
        <EducationalDetailsEdit
          handleCancel={handleCancel}
          onSubmit={onSubmit}
          buttonText='Add Education'
          apiError={apiError}
          trySaving={trySaving}
        />
      )}
      {editId !== 'new' && (
        <Button onClick={() => setEditId('new')}>Add New Education</Button>
      )}
    </Grid>
  );
};

export default EduDetailDesign;
