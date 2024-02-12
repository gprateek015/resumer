'use client';

import React, { useEffect, useState } from 'react';

import { Heading } from './styles';
import {
  deleteExperience,
  fetchExperiences,
  postExperience,
  updateExperience
} from '@/actions/experience';
import { RootState, useDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import WorkExpDetailDesign from '../work-experiences/detail';
import { Experience } from '@/types';

const WorkExperienceDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { errors: apiErrors } = useSelector(
    (state: RootState) => state.onboarding
  );
  const [apiError, setApiError] = useState<string | object | null>(null);
  const [editId, setEditId] = useState<string | undefined | null>(null);

  const { experiences } = useSelector((state: RootState) => state.onboarding);

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteExperience(id));
  };

  const onSubmit = async (data: Experience) => {
    setApiError(null);

    if (editId && editId !== 'new')
      await dispatch(
        updateExperience({
          data: { ...data, _id: undefined, id: undefined, user_id: undefined },
          id: editId
        })
      );
    else await dispatch(postExperience(data));
  };

  useEffect(() => {
    dispatch(fetchExperiences());
  }, []);

  useEffect(() => {
    setApiError(apiErrors);
  }, [apiErrors]);

  useEffect(() => {
    if (experiences?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [experiences]);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Heading mb='20px'>
        Share your internship / work experience with us
      </Heading>

      <WorkExpDetailDesign
        experiences={experiences}
        handleDelete={handleDelete}
        editId={editId}
        setEditId={setEditId}
        onSubmit={onSubmit}
        apiError={apiError}
      />
    </PageContainer>
  );
};

export default WorkExperienceDetails;
