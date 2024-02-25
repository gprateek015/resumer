import {
  deleteEducation,
  postEducation,
  updateEducation
} from '@/actions/education';
import EduDetailDesign from '@/components/educations/detail';
import { EducationData } from '@/components/educations/edit';
import { useDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileEducations = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { watch } = useFormContext();
  const educations = watch('educations');
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<EducationData> = async data => {
    const newData = {
      ...data,
      start_year: data?.start_year,
      end_year: data?.end_year,
      level: data?.edu_level?.value,
      edu_level: undefined,
      maximum_score:
        data.scoring_type === 'percentage' ? 100 : data.maximum_score
    };

    if (editId && editId !== 'new')
      await dispatch(
        updateEducation({
          data: {
            ...newData,
            _id: undefined,
            id: undefined,
            user_id: undefined
          },
          id: editId
        })
      );
    else await dispatch(postEducation(newData));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEducation(id));
  };

  useEffect(() => {
    if (educations?.length) {
      setEditId('');
    } else {
      setEditId('new');
    }
  }, [educations]);

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
