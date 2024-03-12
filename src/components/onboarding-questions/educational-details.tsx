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
import EduDetailDesign from '../educations/detail';
import { SubmitHandler } from 'react-hook-form';
import { EducationData } from '../educations/edit';
import {
  addEducation,
  deleteEducation,
  updateEducationOnb,
  updateOnboardingData
} from '@/redux/slice/onboarding';
import validateEducation from '@/schema/education';
import { useSnackbar } from 'notistack';
import { Education } from '@/types';
import ShortUniqueId from 'short-unique-id';

const EducationalDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const uid = new ShortUniqueId({ length: 5 });
  const {
    data: { educations }
  } = useSelector(state => state.onboarding);
  const [editId, setEditId] = useState<string | null>(null);
  const [trySaving, setTrySaving] = useState(false); // For navigating without with editId !== null
  const [navigateTo, setNavigateTo] = useState<null | Function>(null);

  const onSubmit: SubmitHandler<EducationData> = data => {
    setTrySaving(false);

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
    else dispatch(addEducation({ ...newData, _id: uid.rnd() }));

    navigateTo?.();
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteEducation({ id }));
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

  const onNavigation = (navigate: Function) => {
    const errorIds = Object.keys(errors);
    if (errorIds.length !== 0) {
      const education = educations.find(edu => edu._id === errorIds[0]);
      enqueueSnackbar({
        message: `Please edit ${education?.institute_name}`,
        variant: 'error',
        preventDuplicate: true
      });
    } else if (editId !== null) {
      setTrySaving(true);
      setNavigateTo(() => navigate);
    } else if (!educations?.length) {
      enqueueSnackbar({
        message: 'Minimum one education is required',
        variant: 'warning',
        preventDuplicate: true
      });
    } else {
      navigate();
    }
  };

  const updateEducations = (educations: Education[]) => {
    dispatch(updateOnboardingData({ educations }));
  };

  useEffect(() => {
    if (educations?.length) {
      setEditId(null);
    } else {
      setEditId('new');
    }
  }, [educations]);

  useEffect(() => {
    if (!editId) {
      setTrySaving(false);
    }
  }, [editId]);

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
          Kindly provide us the following details regarding your education
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
            flexGrow: 1
          }}
        >
          <EduDetailDesign
            educations={educations}
            editId={editId}
            setEditId={setEditId}
            handleDelete={handleDelete}
            onSubmit={onSubmit}
            updateEducations={updateEducations}
            errors={errors}
            trySaving={trySaving}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EducationalDetails;
