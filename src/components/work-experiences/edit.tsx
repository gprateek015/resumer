import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FormInput,
  FormLabel,
  Option,
  Options
} from '../onboarding-questions/styles';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import {
  Box,
  Checkbox,
  FormHelperText,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { Experience } from '@/types';
import { useDispatch } from '@/redux/store';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';
import moment from 'moment';

const WorkExpEdit = ({
  handleCancel,
  onSubmit,
  buttonText,
  apiError: apiErrors,
  experience,
  trySaving
}: {
  handleCancel: Function;
  onSubmit: SubmitHandler<any>;
  buttonText: string;
  apiError?: string | object | null;
  experience?: Experience;
  trySaving?: boolean;
}) => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState('');
  const [workingHere, setWorkingHere] = useState(false);
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    reset
  } = useForm();

  const mode = watch('mode');
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    fields: description,
    append,
    remove
  } = useFieldArray({
    name: 'description',
    control
  });

  const onToggleWorkingHere = (value: boolean) => {
    setWorkingHere(value);
    if (value) {
      setValue('end_date', null);
    }
  };

  useEffect(() => {
    reset({
      description: [''],
      ...(experience && {
        ...experience,
        start_date: experience.start_date
          ? moment(experience.start_date).format('YYYY-MM-DD')
          : null,
        end_date: experience.end_date
          ? moment(experience.end_date).format('YYYY-MM-DD')
          : null
      })
    });
    setWorkingHere(!experience?.end_date && !!experience?.start_date);
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

  useEffect(() => {
    if (trySaving) {
      handleSubmit(onSubmit)();
    }
  }, [trySaving]);

  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '10px',
          borderRadius: '5px'
        }}
        ref={containerRef}
      >
        <Box>
          <FormLabel>Employer/company name</FormLabel>
          <FormInput
            {...register('company_name', {
              required: 'Company name is required'
            })}
            placeholder='Enter the company name'
            helperText={errors?.company_name?.message as any}
            error={!!errors?.company_name?.message}
          />
        </Box>
        <Box>
          <FormLabel>Job Title</FormLabel>
          <FormInput
            {...register('position', { required: 'Position is required' })}
            placeholder='Enter the job title'
            helperText={errors?.position?.message as any}
            error={!!errors?.position?.message}
          />
        </Box>
        <Box>
          <FormLabel>Mode of Internship</FormLabel>
          <Options sx={{ gap: '20px' }}>
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
        </Box>
        <Grid>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Checkbox
              sx={{
                color: 'white',
                pl: '0px',
                '&.Mui-checked': {
                  color: 'white'
                }
              }}
              checked={workingHere}
              onClick={() => onToggleWorkingHere(!workingHere)}
              id='working-checkbox'
            />
            <Typography
              component={'label'}
              htmlFor='working-checkbox'
              sx={{
                cursor: 'pointer'
              }}
            >
              Currently working here?
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              gap: { xs: '15px', md: '20px' },
              // flexDirection: { xs: 'column', md: 'row' },
              overflow: 'auto'
            }}
          >
            <Grid
              sx={{
                flexBasis: '40%',
                flexGrow: 1
              }}
            >
              <FormLabel>Start Date</FormLabel>
              <FormInput
                type='date'
                {...register('start_date', { required: 'Required' })}
                helperText={errors?.start_date?.message as any}
                error={!!errors?.start_date?.message}
                sx={{
                  maxWidth: workingHere
                    ? '100%'
                    : (containerRef?.current?.offsetWidth || 400) / 2 - 11
                }}
              />
            </Grid>
            {!workingHere && (
              <Grid
                sx={{
                  flexBasis: '40%',
                  flexGrow: 1
                }}
              >
                <FormLabel>End Date</FormLabel>
                <FormInput
                  type='date'
                  {...register('end_date', {
                    required: 'Required'
                  })}
                  helperText={errors?.end_date?.message as any}
                  error={!!errors?.end_date?.message}
                  sx={{
                    maxWidth:
                      (containerRef?.current?.offsetWidth || 400) / 2 - 11
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {mode === 'onsite' && (
          <Box>
            <>
              <FormLabel>Location</FormLabel>
              <FormInput
                {...register('location', {
                  required: 'Location is required'
                })}
                placeholder='Type in your work location'
                helperText={errors?.location?.message as any}
                error={!!errors?.location?.message}
              />
            </>
          </Box>
        )}
        <Box>
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
                    border: '1px solid #ffffff87',
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
        </Box>
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
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {buttonText}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkExpEdit;
