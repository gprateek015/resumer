'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

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
import {
  addExperience,
  updateExperienceOnb,
  updateOnboardingData
} from '@/redux/slice/onboarding';
import validateExperience from '@/schema/experience';
import { useSnackbar } from 'notistack';
import { Grid } from '@mui/material';

const WorkExperienceDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const { errors: apiErrors } = useSelector(
  //   (state: RootState) => state.onboarding
  // );
  // const [apiError, setApiError] = useState<string | object | null>(null);
  const [editId, setEditId] = useState<string | undefined | null>(null);

  const {
    data: { experiences }
  } = useSelector((state: RootState) => state.onboarding);

  const errors = useMemo(() => {
    const data: any = {};
    experiences.forEach(experience => {
      const resp = validateExperience(experience);
      if (resp.error?.details) {
        const errors: any = {};
        resp.error.details.forEach(
          (err: any) =>
            (errors[err.path[0]] = { message: err.message, type: err.type })
        );
        data[experience._id as string] = errors;
      }
    });
    return data;
  }, [experiences]);

  const handleDelete = async (id?: string) => {
    if (id) await dispatch(deleteExperience(id));
  };

  const onSubmit = (data: Experience) => {
    // setApiError(null);

    if (data.location === '') {
      delete data.location;
    }

    if (editId && editId !== 'new')
      dispatch(
        updateExperienceOnb({
          data: { ...data },
          id: editId
        })
      );
    else dispatch(addExperience(data));
  };

  const onNavigation = (navigate: Function) => {
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
      navigate();
    }
  };

  const updateExperiences = (experiences: Experience[]) => {
    dispatch(updateOnboardingData({ experiences }));
  };

  useEffect(() => {
    dispatch(fetchExperiences());
  }, []);

  // useEffect(() => {
  //   setApiError(apiErrors);
  // }, [apiErrors]);

  useEffect(() => {
    if (experiences?.length) {
      setEditId(null);
    }
    //  else {
    //   setEditId('new');
    // }
  }, [experiences]);

  return (
    <PageContainer
      nextPage={() => onNavigation(nextPage)}
      prevPage={() => onNavigation(prevPage)}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Heading mb='20px'>
          Share your internship / work experience with us
        </Heading>

        <Grid
          sx={{
            backdropFilter: 'blur(20px)',
            p: '20px',
            borderRadius: '20px',
            border: '1px solid #ffffff87',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: '1'
          }}
        >
          <WorkExpDetailDesign
            experiences={experiences}
            handleDelete={handleDelete}
            editId={editId}
            setEditId={setEditId}
            onSubmit={onSubmit}
            updateExperiences={updateExperiences}
            errors={errors}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WorkExperienceDetails;
