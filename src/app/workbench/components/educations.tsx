import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Education, Experience } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import { EducationData } from '@/components/educations/edit';

const Educations = ({
  collapsed,
  toggleCollapse
}: {
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch } = useFormContext();
  const educations = watch('educations');

  const onSubmit: SubmitHandler<EducationData> = data => {
    const newData = {
      ...data,
      start_year: data?.start_year?.split?.('-')?.[0],
      end_year: data?.end_year?.split?.('-')?.[0],
      level: data?.edu_level?.value,
      edu_level: undefined,
      maximum_score:
        data.scoring_type === 'percentage' ? 100 : data.maximum_score
    };

    if (editId === 'new') {
      setValue('educations', [...educations, newData]);
    } else {
      setValue(
        'educations',
        educations.map((edu: Education) => {
          if (edu._id === editId) {
            return newData;
          }
          return edu;
        })
      );
    }
  };

  const handleDelete = (id: string) => {
    setValue(
      'educations',
      educations.filter((exp: Experience) => exp._id !== id)
    );
  };

  return (
    <Grid>
      <Heading
        title='Academic History'
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
          <EduDetailDesign
            educations={educations}
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

export default Educations;
