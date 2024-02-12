import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, Grid } from '@mui/material';
import Select from 'react-select';
import { cgpa, educationalLevels } from '@/constants';

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
import moment from 'moment';

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

  const cgpaOption = cgpa.map(cgpa => ({
    label: cgpa,
    value: cgpa
  }));

  const levelOption = educationalLevels.map(lvl => ({
    label: firstLetterCapital(lvl.split('_').join(' ')) as string,
    value: lvl
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    getValues
  } = useForm({
    defaultValues: education
      ? {
          ...education,
          edu_level: levelOption.find(opt => opt.value === education.level),
          start_year: moment(`${education.start_year || ''}`).format(
            'YYYY-MM-DD'
          ),
          end_year: moment(`${education.end_year || ''}`).format('YYYY-MM-DD')
        }
      : {
          // level: undefined,
          edu_level: undefined,
          institute_name: undefined,
          start_year: undefined,
          end_year: undefined,
          score: undefined,
          scoring_type: undefined,
          maximum_score: undefined,
          specialisation: undefined,
          degree: undefined
        }
  });

  const eduLevel = watch('edu_level');
  const scoringType = watch('scoring_type');

  useEffect(() => {
    if (typeof apiErrors === 'string') {
      setApiError(apiErrors);
      dispatch(clearOnboardingErrors());
    } else if (apiErrors) {
      Object.keys(apiErrors || {}).forEach((error: any) => {
        setError(error, { message: (apiErrors as any)[error].message });
      });
      dispatch(clearOnboardingErrors());
    }
  }, [apiErrors]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <FormLabel>Educational Level</FormLabel>
      <Select
        options={levelOption}
        styles={selectStyles}
        placeholder='Graduation'
        value={eduLevel}
        onChange={(opt: any) => setValue('edu_level', opt)}
      />
      <FormLabel>Institue / College name</FormLabel>
      <FormInput
        {...register('institute_name', {
          required: 'Institute name is required!'
        })}
        helperText={errors?.institute_name?.message}
        error={!!errors?.institute_name}
        placeholder='IIT Mumbai'
      />
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
      <Grid
        sx={{
          display: 'flex',
          gap: '20px',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Box flexBasis={'50%'} flexGrow={1}>
          <FormLabel mb='10px'>Score</FormLabel>
          <FormInput
            type='number'
            {...register('score', { required: 'Score is required' })}
            helperText={errors?.score?.message}
            error={!!errors?.score}
            placeholder={scoringType === 'cgpa' ? '4.5 OR 9.0' : '90%'}
          />
        </Box>
        {scoringType === 'cgpa' && (
          <Box flexBasis={'50%'}>
            <FormLabel mb='10px'>Maximum Score</FormLabel>
            <FormInput
              type='number'
              {...register('maximum_score', {
                required: 'Max Score is required'
              })}
              helperText={errors?.maximum_score?.message}
              error={!!errors?.maximum_score}
              placeholder='5 OR 10'
            />
          </Box>
        )}
      </Grid>
      {['graduation', 'post_graduation'].includes(
        eduLevel?.value as string
      ) && (
        <>
          <FormLabel>Degree</FormLabel>
          <FormInput
            {...register('degree', { required: 'Degree is required' })}
            helperText={errors?.degree?.message}
            error={!!errors.degree}
            placeholder='Bachelors of Technology'
          />
        </>
      )}
      <Grid
        sx={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Grid>
          <FormLabel mb='15px'>Start Year</FormLabel>
          <FormInput
            type='date'
            {...register('start_year', { required: 'Start year is required' })}
            helperText={errors.start_year?.message}
            error={!!errors.start_year}
          />
        </Grid>
        <Grid>
          <FormLabel mb='15px'>End Year</FormLabel>
          <FormInput
            type='date'
            {...register('end_year', { required: 'End year is required' })}
            helperText={errors.end_year?.message}
            error={!!errors.end_year}
          />
        </Grid>
      </Grid>
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
            helperText={errors.specialisation?.message}
            error={!!errors.specialisation}
            placeholder='Computer Science and Engineering'
          />
        </>
      )}

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
  );
};

export default EducationalDetailsEdit;
