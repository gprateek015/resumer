import React, { useEffect, useMemo, useState } from 'react';
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
import {
  addEducation,
  updateEducationOnb,
  updateOnboardingData
} from '@/redux/slice/onboarding';
import validateEducation from '@/schema/education';
import { useSnackbar } from 'notistack';
import { Education } from '@/types';

const EducationalDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: { educations }
  } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | null>(null);
  const { errors: apiErrors } = useSelector(state => state.onboarding);
  const [apiError, setApiError] = useState<string | object | null>(null);

  const onSubmit: SubmitHandler<EducationData> = data => {
    setApiError(null);

    const newData = {
      ...data,
      start_year: data?.start_year,
      end_year: data?.end_year,
      level: data?.edu_level?.value,
      maximum_score:
        data.scoring_type === 'percentage' ? 100 : data.maximum_score
    };
    delete newData.edu_level;

    if (editId && editId !== 'new')
      dispatch(
        updateEducationOnb({
          data: {
            ...newData
          },
          id: editId
        })
      );
    else dispatch(addEducation(newData));
  };

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteEducation(id));
  };

  const errors = useMemo(() => {
    const data: any = {};
    educations.forEach(education => {
      const resp = validateEducation(education);
      if (resp.error?.details) {
        const errors: any = {};
        resp.error.details.forEach(
          (err: any) =>
            (errors[err.path[0]] = { message: err.message, type: err.type })
        );
        data[education._id as string] = errors;
      }
    });
    return data;
  }, [educations]);

  const onNext = () => {
    const errorIds = Object.keys(errors);
    if (errorIds.length !== 0) {
      enqueueSnackbar({
        message: 'Error in work experiences',
        variant: 'error',
        preventDuplicate: true
      });
    } else if (editId !== null) {
      enqueueSnackbar({
        message: 'Either cancel or save the changes',
        variant: 'warning',
        preventDuplicate: true
      });
    } else {
      nextPage();
    }
  };

  const updateEducations = (educations: Education[]) => {
    dispatch(updateOnboardingData({ educations }));
  };

  useEffect(() => {
    setApiError(apiErrors);
  }, [apiErrors]);

  // useEffect(() => {
  //   dispatch(fetchEductions());
  // }, []);

  useEffect(() => {
    if (educations?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [educations]);

  return (
    <PageContainer nextPage={onNext} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>
          Kindly provide us the following details regarding your education
        </Heading>
        <EduDetailDesign
          educations={educations}
          editId={editId}
          setEditId={setEditId}
          handleDelete={handleDelete}
          onSubmit={onSubmit}
          errors={errors}
        />
      </Grid>
    </PageContainer>
  );
};

export default EducationalDetails;
