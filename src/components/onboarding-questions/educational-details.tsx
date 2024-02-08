import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Select from 'react-select';

import {
  FormInput,
  FormLabel,
  Heading,
  selectStyles,
  Option,
  Options,
  PageNavButton,
  Button
} from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { useDispatch, useSelector } from '@/redux/store';
import {
  deleteEducation,
  fetchEductions,
  postEducation,
  updateEducation
} from '@/actions/education';
import EduDetailDesign from '../educations/detail';
import { SubmitHandler } from 'react-hook-form';
import { EducationData } from '../educations/edit';

const EducationalDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { educations } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | null>(null);
  const { errors: apiErrors } = useSelector(state => state.onboarding);
  const [apiError, setApiError] = useState<string | object | null>(null);

  const onSubmit: SubmitHandler<EducationData> = async data => {
    setApiError(null);

    const newData = {
      ...data,
      start_year: data?.start_year?.split?.('-')?.[0],
      end_year: data?.end_year?.split?.('-')?.[0],
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

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteEducation(id));
  };

  useEffect(() => {
    setApiError(apiErrors);
  }, [apiErrors]);

  useEffect(() => {
    dispatch(fetchEductions());
  }, []);

  return (
    <PageContainer nextPage={nextPage} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>
          Kindly provide us the following <br />
          details regarding your education
        </Heading>
        <EduDetailDesign
          educations={educations}
          editId={editId}
          setEditId={setEditId}
          handleDelete={handleDelete}
          onSubmit={onSubmit}
          apiError={apiError}
        />
      </Grid>
    </PageContainer>
  );
};

export default EducationalDetails;
