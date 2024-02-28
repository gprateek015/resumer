import React from 'react';
import { Box, Grid } from '@mui/material';
import Select from 'react-select';
import { contries } from '@/constants';
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
    data: { phone, linkedin, github, twitter, portfolio, country, state, city }
  } = useSelector(state => state.onboarding);

  const contriesOption = contries.map(country => ({
    label: country,
    value: country
  }));
  const statesOption = contries.map(country => ({
    label: country,
    value: country
  }));
  const citiesOption = contries.map(country => ({
    label: country,
    value: country
  }));

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: phone || undefined,
      linkedin: linkedin || undefined,
      github: github || undefined,
      twitter: twitter || undefined,
      portfolio: portfolio || undefined,
      country: country || undefined,
      state: state || undefined,
      city: city || undefined
    }
  });

  const onSubmit = (data: ContactDetailsType) => {
    dispatch(updateOnboardingData(data));
    nextPage();
  };

  return (
    <PageContainer nextPage={handleSubmit(onSubmit)} prevPage={prevPage}>
      <Grid>
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
            <FormLabel>Please provide us with your phone number</FormLabel>
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
            <FormLabel>Lets show your twitter to everyone</FormLabel>
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
                gap: '30px',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Select
                options={contriesOption}
                styles={selectStyles}
                placeholder='Country'
                menuPlacement='top'
              />
              <Select
                options={statesOption}
                styles={selectStyles}
                placeholder='State'
                menuPlacement='top'
              />
              <Select
                options={citiesOption}
                styles={selectStyles}
                placeholder='City'
                menuPlacement='top'
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ContactDetails;
