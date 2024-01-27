import React, { useEffect, useState } from 'react';
import {
  Button,
  FormInput,
  FormLabel,
  Option,
  Options
} from '../onboarding-questions/styles';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext
} from 'react-hook-form';
import { Box, FormHelperText, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { Experience } from '@/types';
import { useDispatch } from '@/redux/store';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';

const WorkExpEdit = ({
  handleCancel,
  onSubmit,
  buttonText,
  apiError: apiErrors,
  experience
}: {
  handleCancel: Function;
  onSubmit: SubmitHandler<any>;
  buttonText: string;
  apiError?: string | object | null;
  experience?: Experience;
}) => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState('');
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
    setError,
    clearErrors
  } = useForm();

  const mode = watch('mode');

  const {
    fields: description,
    append,
    remove
  } = useFieldArray({
    name: 'description',
    control
  });

  useEffect(() => {
    if (experience) {
      (Object.keys(experience || {}) as Array<keyof Experience>).forEach(
        key => {
          if (key !== '_id' && key !== 'user_id' && experience)
            setValue(key, experience[key] as any);
        }
      );
    } else {
      const newValues = {
        company_name: undefined,
        position: undefined,
        start_date: undefined,
        end_date: undefined,
        mode: undefined,
        location: undefined,
        description: ['']
      };

      (Object.keys(newValues) as Array<keyof typeof newValues>).map(key => {
        setValue(key, newValues[key]);
      });
    }
  }, [experience]);

  useEffect(() => {
    if (typeof apiErrors === 'string') {
      setApiError(apiErrors);
      dispatch(clearOnboardingErrors());
    } else if (apiErrors) {
      Object.keys(apiErrors || {}).forEach((error: any) => {
        setError(error, { message: (apiErrors as any)[error].message });
      });
      dispatch(clearOnboardingErrors());

      setTimeout(() => {
        clearErrors('description');
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
          helperText={errors?.company_name?.message as any}
          error={!!errors?.company_name?.message}
        />
        <FormLabel>Job Title</FormLabel>
        <FormInput
          {...register('position', { required: 'Position is required' })}
          placeholder='Enter the job title'
          helperText={errors?.position?.message as any}
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
              helperText={errors?.start_date?.message as any}
              error={!!errors?.start_date?.message}
            />
          </Grid>
          <Grid>
            <FormLabel mb='15px'>End Date</FormLabel>
            <FormInput
              type='date'
              {...register('end_date', { required: true })}
              helperText={errors?.end_date?.message as any}
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
              helperText={errors?.location?.message as any}
              error={!!errors?.location?.message}
            />
          </>
        )}
        <FormLabel>Please describe your work experience below</FormLabel>
        <Grid>
          {description?.map((desc, ind: number) => (
            <Box display={'flex'} gap='10px' key={desc.id} mb='10px'>
              <FormInput
                {...register(`description.${ind}`)}
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
              {errors?.description?.message as string}
            </FormHelperText>
          )}
          <Button
            onClick={() => append('')}
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
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkExpEdit;
