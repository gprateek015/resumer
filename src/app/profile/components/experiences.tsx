import { deleteExperience } from '@/actions/experience';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { useDispatch } from '@/redux/store';
import { Experience } from '@/types';
import React, { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileExperiences = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  const experiences = watch('experiences');

  const onSubmit: SubmitHandler<Experience> = data => {
    // if (editId === 'new') {
    //   setValue('experiences', [...experiences, data]);
    // } else {
    //   setValue(
    //     'experiences',
    //     experiences.map((exp: Experience) => {
    //       if (exp._id === editId) {
    //         return data;
    //       }
    //       return exp;
    //     })
    //   );
    // }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteExperience(id));
  };

  return (
    <WorkExpDetailDesign
      experiences={experiences || []}
      handleDelete={handleDelete}
      editId={editId}
      setEditId={setEditId}
      onSubmit={onSubmit}
    />
  );
};

export default ProfileExperiences;
