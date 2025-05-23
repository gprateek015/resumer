import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Education, Experience } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import { EducationData } from '@/components/educations/edit';
import ShortUniqueId from 'short-unique-id';

const Educations = ({
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
  const educations = watch('educations');
  const uid = new ShortUniqueId({ length: 5 });

  const onSubmit: SubmitHandler<EducationData> = data => {
    const newData = {
      ...data,
      start_year: data?.start_year,
      end_year: data?.end_year,
      level: data?.edu_level?.value,
      edu_level: undefined,
      maximum_score:
        data.scoring_type === 'percentage' ? 100 : data.maximum_score,
      _id: uid.rnd()
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
    handleSubmit(reloadResume)();
  };

  const handleDelete = (id: string) => {
    setValue(
      'educations',
      educations.filter((exp: Experience) => exp._id !== id)
    );
  };

  const updateEducations = (educations: Education[]) => {
    setValue('educations', educations);
  };

  useEffect(() => {
    if (educations?.length) {
      setEditId('');
    } else {
      setEditId('new');
    }
  }, [educations]);

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
            updateEducations={updateEducations}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Educations;
