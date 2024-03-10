import {
  deleteExperience,
  postExperience,
  updateExperience
} from '@/actions/experience';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { clearError } from '@/redux/slice/user';
import { useDispatch, useSelector } from '@/redux/store';
import { Experience } from '@/types';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

const ProfileExperiences = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const { watch } = useFormContext();
  const dispatch = useDispatch();
  const experiences = watch('experiences');
  const { error } = useSelector(state => state.user);

  const apiError = useMemo(() => {
    let apierror;
    try {
      apierror = JSON.parse(error || '');
    } catch (_) {
      apierror = error;
    }
    return apierror;
  }, [error]);

  const onSubmit: SubmitHandler<Experience> = async data => {
    if (editId && editId !== 'new')
      await dispatch(
        updateExperience({
          data: { ...data, _id: undefined, id: undefined, user_id: undefined },
          id: editId
        })
      );
    else await dispatch(postExperience(data));

    dispatch(clearError());
  };

  const handleDelete = (id: string) => {
    dispatch(deleteExperience(id));
  };

  useEffect(() => {
    if (experiences?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [experiences]);

  return (
    <WorkExpDetailDesign
      experiences={experiences || []}
      handleDelete={handleDelete}
      editId={editId}
      setEditId={setEditId}
      onSubmit={onSubmit}
      apiError={apiError}
    />
  );
};

export default ProfileExperiences;
