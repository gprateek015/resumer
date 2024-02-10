import { deleteEducation } from '@/actions/education';
import EduDetailDesign from '@/components/educations/detail';
import { EducationData } from '@/components/educations/edit';
import { useDispatch } from '@/redux/store';
import React, { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileEducations = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { setValue, watch } = useFormContext();
  const educations = watch('educations');
  const dispatch = useDispatch();

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

    // if (editId === 'new') {
    //   setValue('educations', [...educations, newData]);
    // } else {
    //   setValue(
    //     'educations',
    //     educations.map((edu: Education) => {
    //       if (edu._id === editId) {
    //         return newData;
    //       }
    //       return edu;
    //     })
    //   );
    // }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEducation(id));
  };
  return (
    <EduDetailDesign
      educations={educations || []}
      handleDelete={handleDelete}
      editId={editId}
      setEditId={setEditId}
      onSubmit={onSubmit}
    />
  );
};

export default ProfileEducations;
