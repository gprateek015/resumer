import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import Select from 'react-select';
import { educationalLevels } from '@/constants';

import {
  FormInput,
  FormLabel,
  Heading,
  selectStyles,
  Option,
  Options,
  PageNavButton,
  Button
} from '../onboarding-questions/styles';
import { Education } from '@/types';
import { useDispatch, useSelector } from '@/redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { firstLetterCapital } from '@/utils';
import { postEducation, updateEducation } from '@/actions/education';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';

export type EducationData = Education & {
  edu_level?: {
    label: string;
    value: string;
  };
};

const EducationalDetailsEdit = ({
  handleCancel,
  education,
  onSubmit,
  buttonText,
  apiError: apiErrors
}: {
  handleCancel: Function;
  education?: EducationData;
  onSubmit: SubmitHandler<EducationData>;
  buttonText?: string;
  apiError?: string | object | null;
}) => {
  const dispatch = useDispatch();
  // const { errors: apiErrors } = useSelector(state => state.onboarding);
  const [apiError, setApiError] = useState<string | null>(null);

  const levelOption = educationalLevels.map(lvl => ({
    label: firstLetterCapital(lvl.split('_').join(' ')) as string,
    value: lvl
  }));
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
    reset
  } = useForm();

  const eduLevel = watch('edu_level');
  const scoringType = watch('scoring_type');

  useEffect(() => {
    reset({
      ...(education && {
        ...education,
        edu_level: levelOption.find(opt => opt.value === education.level)
      })
    });
  }, [education]);

  useEffect(() => {
    if (typeof apiErrors === 'string') {
      setApiError(apiErrors);
      dispatch(clearOnboardingErrors());
    } else if (apiErrors) {
      Object.keys(apiErrors || {}).forEach((error: any) => {
        setError(error === 'level' ? 'edu_level' : error, {
          message: (apiErrors as any)[error].message
        });
      });
      dispatch(clearOnboardingErrors());
    }
  }, [apiErrors]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '10px',
        border: '1px solid white',
        borderRadius: '5px'
      }}
      ref={containerRef}
    >
      <Box>
        <FormLabel>Educational Level</FormLabel>
        <Select
          options={levelOption}
          styles={selectStyles}
          placeholder='Graduation'
          value={eduLevel}
          onChange={(opt: any) => {
            setValue('edu_level', opt);
            clearErrors('edu_level');
          }}
        />
        {errors?.edu_level && (
          <FormHelperText error>
            {errors?.edu_level?.message as string}
          </FormHelperText>
        )}
      </Box>
      <Box>
        <FormLabel>Institue / College name</FormLabel>
        <FormInput
          {...register('institute_name', {
            required: 'Institute name is required!'
          })}
          helperText={errors?.institute_name?.message as string}
          error={!!errors?.institute_name}
          placeholder='IIT Mumbai'
        />
      </Box>
      <Box>
        <FormLabel>Scoring Type</FormLabel>
        <Options sx={{ gap: '20px' }}>
          <Option
            active={(scoringType === 'cgpa').toString()}
            onClick={_ => setValue('scoring_type', 'cgpa')}
          >
            CGPA
          </Option>
          <Option
            active={(scoringType === 'percentage').toString()}
            onClick={_ => setValue('scoring_type', 'percentage')}
          >
            Percentage
          </Option>
        </Options>
      </Box>

      <Grid
        sx={{
          display: 'flex',
          gap: '20px'
          // flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Box flexBasis={'50%'} flexGrow={1}>
          <FormLabel>Score</FormLabel>
          <FormInput
            type='number'
            {...register('score', { required: 'Score is required' })}
            helperText={errors?.score?.message as string}
            error={!!errors?.score}
            placeholder={scoringType === 'cgpa' ? '4.5 OR 9.0' : '90%'}
          />
        </Box>
        {scoringType === 'cgpa' && (
          <Box flexBasis={'50%'} flexGrow={1}>
            <FormLabel>Maximum Score</FormLabel>
            <FormInput
              type='number'
              {...register('maximum_score', {
                required: 'Max Score is required'
              })}
              helperText={errors?.maximum_score?.message as string}
              error={!!errors?.maximum_score}
              placeholder='5 OR 10'
            />
          </Box>
        )}
      </Grid>
      <Box>
        {['graduation', 'post_graduation'].includes(
          eduLevel?.value as string
        ) && (
          <>
            <FormLabel>Degree</FormLabel>
            <FormInput
              {...register('degree', { required: 'Degree is required' })}
              helperText={errors?.degree?.message as string}
              error={!!errors.degree}
              placeholder='Bachelors of Technology'
            />
          </>
        )}
      </Box>
      <Grid
        sx={{
          display: 'flex',
          gap: '20px'
          // justifyContent: 'space-between'
          // flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Box flexBasis={'50%'} flexGrow={1}>
          <FormLabel>Start Year</FormLabel>
          <FormInput
            type='number'
            {...register('start_year', { required: 'Start year is required' })}
            helperText={errors.start_year?.message as string}
            error={!!errors.start_year}
            placeholder='2020'
          />
        </Box>
        <Box flexBasis={'50%'} flexGrow={1}>
          <FormLabel>End Year</FormLabel>
          <FormInput
            type='number'
            {...register('end_year', { required: 'End year is required' })}
            helperText={errors.end_year?.message as string}
            error={!!errors.end_year}
            placeholder='2024'
          />
        </Box>
      </Grid>
      <Box>
        {[
          'senior_secondary',
          'diploma',
          'graduation',
          'post_graduation'
        ].includes(eduLevel?.value as string) && (
          <>
            <FormLabel>Specialization</FormLabel>
            <FormInput
              {...register('specialisation', { required: true })}
              helperText={errors.specialisation?.message as string}
              error={!!errors.specialisation}
              placeholder='Computer Science and Engineering'
            />
          </>
        )}
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
        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{
            flexBasis: '50%'
          }}
        >
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
  );
};

export default EducationalDetailsEdit;
