import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Experience } from '@/types';
import ShortUniqueId from 'short-unique-id';

const Experiences = ({
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
  const experiences = watch('experiences');
  const uid = new ShortUniqueId({ length: 5 });

  const onSubmit: SubmitHandler<Experience> = data => {
    const newData = {
      ...data,
      _id: uid.rnd()
    };

    if (editId === 'new') {
      setValue('experiences', [...experiences, newData]);
    } else {
      setValue(
        'experiences',
        experiences.map((exp: Experience) => {
          if (exp._id === editId) {
            return newData;
          }
          return exp;
        })
      );
    }
    handleSubmit(reloadResume)();
  };

  const handleDelete = (id: string) => {
    setValue(
      'experiences',
      experiences.filter((exp: Experience) => exp._id !== id)
    );
  };

  useEffect(() => {
    if (experiences?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [experiences]);

  return (
    <Grid>
      <Heading
        title='Experiences'
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
          <WorkExpDetailDesign
            experiences={experiences}
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

export default Experiences;
