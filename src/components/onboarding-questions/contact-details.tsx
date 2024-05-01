import React, { useMemo } from 'react';
import { Box, FormHelperText, Grid, TextField } from '@mui/material';
import Select from 'react-select';
import { contries, states } from '@/constants';
import {
  Heading,
  selectStyles,
  FormInput,
  FormLabel,
  Option,
  Options,
  PageNavButton
} from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '@/redux/store';
import { updateUser } from '@/actions/user';
import { updateOnboardingData } from '@/redux/slice/onboarding';
import { space_grotest } from '@/font-family';

type ContactDetailsType = {
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  country?: string;
  state?: string;
  city?: string;
};

const ContactDetails = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const {
    data: {
      phone,
      linkedin,
      github,
      twitter,
      portfolio,
      country: defaultCountry,
      state: defaultState,
      city: defaultCity
    }
  } = useSelector(state => state.onboarding);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      phone: phone || undefined,
      linkedin: linkedin || undefined,
      github: github || undefined,
      twitter: twitter || undefined,
      portfolio: portfolio || undefined,
      country: defaultCountry || 'India',
      state: defaultState || undefined,
      city: defaultCity || undefined
    }
  });

  const country = watch('country');
  const state = watch('state');
  const city = watch('city');

  const contriesOption = contries.map(country => ({
    label: country,
    value: country
  }));
  const statesOption = Object.keys(states).map(state => ({
    label: state,
    value: state
  }));
  const citiesOption = useMemo(() => {
    if (state) {
      return states[state as keyof typeof states]?.map(city => ({
        label: city,
        value: city
      }));
    }
    return [];
  }, [state]);

  const onSubmit = (data: ContactDetailsType) => {
    dispatch(updateOnboardingData(data));
    nextPage();
  };

  return (
    <PageContainer nextPage={handleSubmit(onSubmit)} prevPage={prevPage}>
      <Grid className={space_grotest.className}>
        <Heading mb='20px'>
          Let's start with some of your contact details
        </Heading>

        <Grid
          sx={{
            gap: '15px',
            backdropFilter: 'blur(20px)',
            p: '20px',
            borderRadius: '20px',
            border: '1px solid #ffffff87',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box>
            <Grid container justifyContent={'space-between'}>
              <FormLabel>Please provide us with your phone number</FormLabel>
              <FormHelperText error sx={{ float: 'right' }}>
                *required
              </FormHelperText>
            </Grid>
            <FormInput
              {...register('phone', { required: 'Phone Number is required' })}
              placeholder='Enter your phone number'
              helperText={errors?.phone?.message}
              error={!!errors?.phone}
            />
          </Box>
          <Box>
            <FormLabel>Your Linkedin for the recruiters</FormLabel>
            <FormInput
              placeholder='https://linkedin.com/in/username'
              {...register('linkedin', { required: false })}
              helperText={errors?.linkedin?.message}
              error={!!errors?.linkedin}
            />
          </Box>
          <Box>
            <FormLabel>Showcase all your work through your github</FormLabel>
            <FormInput
              placeholder='https://github.com/username'
              {...register('github', { required: false })}
              helperText={errors?.github?.message}
              error={!!errors?.github}
            />
          </Box>
          <Box>
            <FormLabel>Let's show your twitter to everyone</FormLabel>
            <FormInput
              placeholder='https://twitter.com/username'
              {...register('twitter', { required: false })}
              helperText={errors?.twitter?.message}
              error={!!errors?.twitter}
            />
          </Box>
          <Box>
            <FormLabel>
              Do you have a personal portfolio website, if yes, please provide
              it
            </FormLabel>
            <FormInput
              placeholder='https://your-name.com'
              {...register('portfolio', { required: false })}
              helperText={errors?.portfolio?.message}
              error={!!errors?.portfolio}
            />
          </Box>
          <Box>
            <FormLabel>
              Please share your current adress which you would like to include
              in your resume
            </FormLabel>
            <Grid
              sx={{
                display: 'flex',
                gap: { xs: '8px', md: '28px' },
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', md: 'row' }
              }}
            >
              <Select
                options={contriesOption}
                styles={selectStyles}
                placeholder='Country'
                menuPlacement='top'
                value={contriesOption?.find(cntry => cntry.value === country)}
                onChange={val => setValue('country', val.value)}
              />
              {country === 'India' ? (
                <>
                  <Select
                    options={statesOption}
                    styles={selectStyles}
                    placeholder='State'
                    menuPlacement='top'
                    value={statesOption?.find(opts => opts.value === state)}
                    onChange={val => setValue('state', val.value)}
                  />
                  <Select
                    options={citiesOption}
                    styles={selectStyles}
                    placeholder='City'
                    menuPlacement='top'
                    value={citiesOption?.find(opts => opts.value === city)}
                    onChange={val => setValue('city', val.value)}
                  />
                </>
              ) : (
                <>
                  <FormInput placeholder='State' {...register('state')} />
                  <FormInput placeholder='City' {...register('city')} />
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ContactDetails;
