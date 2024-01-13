'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import ShortUniqueId from 'short-unique-id';

import {
  FormInput,
  FormLabel,
  Heading,
  Button,
  Options,
  Option
} from './styles';
import { Experience } from '@/types';
import { postExperience, updateExperience } from '@/actions/experience';
import { RootState, useDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';

type ExperienceData = Experience & {
  descriptions?: {
    id: string;
    value: string;
  }[];
};

const WorkExperienceEdit = ({
  value,
  handleCancel
}: {
  value?: Experience;
  handleCancel: Function;
}) => {
  const uid = new ShortUniqueId({ length: 5 });
  const dispatch = useDispatch();
  const { errors: apiErrors } = useSelector(
    (state: RootState) => state.onboarding
  );
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors
  } = useForm({
    defaultValues: value
      ? {
          ...value,
          descriptions: value?.description?.map?.((desc: string) => ({
            id: uid.rnd(),
            value: desc
          }))
        }
      : ({
          company_name: undefined,
          position: undefined,
          start_date: undefined,
          end_date: undefined,
          mode: undefined,
          location: undefined,
          user_id: undefined,
          descriptions: [{ id: uid.rnd(), value: '' }]
        } as ExperienceData)
  });

  const {
    fields: description,
    append,
    remove
  } = useFieldArray({
    name: 'descriptions',
    control
  });

  const mode = watch('mode');

  const onSubmit = async (data: ExperienceData) => {
    setApiError(null);

    const newData = {
      ...data,
      description: data.descriptions?.map(desc => desc.value),
      descriptions: undefined
    };
    if (value && value?.id)
      await dispatch(
        updateExperience({
          data: { ...newData, id: undefined, user_id: undefined },
          id: value?.id
        })
      );
    else await dispatch(postExperience(newData));
  };

  useEffect(() => {
    if (typeof apiErrors === 'string') {
      setApiError(apiErrors);
      dispatch(clearOnboardingErrors());
    } else if (apiErrors) {
      Object.keys(apiErrors || {}).forEach((error: any) => {
        console.log(error, apiErrors[error].message);
        setError(error, { message: apiErrors[error].message });
      });
      dispatch(clearOnboardingErrors());

      setTimeout(() => {
        clearErrors('description');
        clearErrors('descriptions');
      }, 2000);
    }
  }, [apiErrors]);

  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          my: '25px'
        }}
      >
        <FormLabel>Employer/company name</FormLabel>
        <FormInput
          {...register('company_name', {
            required: 'Company name is required'
          })}
          placeholder='Enter the company name'
          helperText={errors?.company_name?.message}
          error={!!errors?.company_name?.message}
        />
        <FormLabel>Job Title</FormLabel>
        <FormInput
          {...register('position', { required: 'Position is required' })}
          placeholder='Enter the job title'
          helperText={errors?.position?.message}
          error={!!errors?.position?.message}
        />
        <FormLabel>Mode of Internship</FormLabel>
        <Options sx={{ gap: '40px' }}>
          <Option
            active={(mode === 'remote').toString()}
            onClick={e => setValue('mode', 'remote')}
          >
            Remote
          </Option>
          <Option
            active={(mode === 'onsite').toString()}
            onClick={e => setValue('mode', 'onsite')}
          >
            On site
          </Option>
        </Options>
        <Grid
          sx={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'space-between'
          }}
        >
          <Grid>
            <FormLabel mb='15px'>Start Date</FormLabel>
            <FormInput
              type='date'
              {...register('start_date', { required: true })}
              helperText={errors?.start_date?.message}
              error={!!errors?.start_date?.message}
            />
          </Grid>
          <Grid>
            <FormLabel mb='15px'>End Date</FormLabel>
            <FormInput
              type='date'
              {...register('end_date', { required: true })}
              helperText={errors?.end_date?.message}
              error={!!errors?.end_date?.message}
            />
          </Grid>
        </Grid>
        {mode === 'onsite' && (
          <>
            <FormLabel>Location</FormLabel>
            <FormInput
              {...register('location', { required: 'Location is required' })}
              placeholder='Type in your work location'
              helperText={errors?.location?.message}
              error={!!errors?.location?.message}
            />
          </>
        )}
        <FormLabel>Please describe your work experience below</FormLabel>
        <Grid>
          {description?.map((desc, ind: number) => (
            <Box display={'flex'} gap='10px' key={desc.id} mb='10px'>
              <FormInput
                {...register(`descriptions.${ind}.value`)}
                placeholder='Tasks you did in your internship/job'
              />
              <IconButton
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '3px'
                }}
                onClick={() => remove(ind)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          {errors?.description && (
            <FormHelperText error>
              {errors?.description?.message}
            </FormHelperText>
          )}
          <Button
            onClick={() =>
              append({
                id: uid.rnd(),
                value: ''
              })
            }
            sx={{
              background: 'transparent'
            }}
            startIcon={<AddIcon />}
            fullWidth
          >
            Add another point
          </Button>
        </Grid>
        {apiError && <FormHelperText error>{apiError}</FormHelperText>}
        <Grid
          sx={{
            mt: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <Button onClick={() => handleCancel()} sx={{ flexBasis: '50%' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} sx={{ flexBasis: '50%' }}>
            {value ? 'Save' : 'Add experience'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkExperienceEdit;
