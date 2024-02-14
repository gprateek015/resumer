import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import {
  FormInput,
  FormLabel,
  Heading,
  Option,
  Options,
  PageNavButton
} from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { useDispatch, useSelector } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { updateUser } from '@/actions/user';

type LinkNameType =
  | 'leetcode'
  | 'codeforces'
  | 'geeksforgeeks'
  | 'hackerrank'
  | 'hackerearth'
  | 'atcoder'
  | 'codechef';

const CodingProfiles = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const { codingProfiles, errors: apiErrors } = useSelector(
    state => state.onboarding
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: {
      leetcode: '',
      codeforces: '',
      geeksforgeeks: '',
      hackerrank: '',
      hackerearth: '',
      atcoder: '',
      codechef: ''
    }
  });

  const onSubmit = async (data: any = {}) => {
    const finalData = Object.keys(data)
      .filter(name => data[name])
      .map((name: string) => ({
        name: name as LinkNameType,
        link: data[name] as string
      }));

    const resp = await dispatch(
      updateUser({ profile_links: finalData, onboarding_completed: true })
    );
    if (resp.meta.requestStatus === 'fulfilled') nextPage();
  };

  useEffect(() => {
    for (let profile of codingProfiles) {
      setValue(profile.name, profile.link as string);
    }
  }, [codingProfiles]);

  return (
    <PageContainer nextPage={handleSubmit(onSubmit)} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>Please provide us all your coding profiles</Heading>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          <Box>
            <FormLabel>Leetcode</FormLabel>
            <FormInput
              placeholder='https://leetcode.com/username'
              {...register('leetcode', { required: false })}
              helperText={errors?.leetcode?.message}
              error={!!errors?.leetcode}
            />
          </Box>
          <Box>
            <FormLabel>Codeforces</FormLabel>
            <FormInput
              placeholder='https://codeforces.com/username'
              {...register('codeforces', { required: false })}
              helperText={errors?.codeforces?.message}
              error={!!errors?.codeforces}
            />
          </Box>
          <Box>
            <FormLabel>Geeksforgeeks</FormLabel>
            <FormInput
              placeholder='https://geeksforgeeks.com/username'
              {...register('geeksforgeeks', { required: false })}
              helperText={errors?.geeksforgeeks?.message}
              error={!!errors?.geeksforgeeks}
            />
          </Box>
          <Box>
            <FormLabel>HackerRank</FormLabel>
            <FormInput
              placeholder='https://hackerrank.com/username'
              {...register('hackerrank', { required: false })}
              helperText={errors?.hackerrank?.message}
              error={!!errors?.hackerrank}
            />
          </Box>
          <Box>
            <FormLabel>HackerEarth</FormLabel>
            <FormInput
              placeholder='https://hackerearth.com/username'
              {...register('hackerearth', { required: false })}
              helperText={errors?.hackerearth?.message}
              error={!!errors?.hackerearth}
            />
          </Box>
          <Box>
            <FormLabel>AtCoder</FormLabel>
            <FormInput
              placeholder='https://atcoder.com/username'
              {...register('atcoder', { required: false })}
              helperText={errors?.atcoder?.message}
              error={!!errors?.atcoder}
            />
          </Box>
          <Box>
            <FormLabel>CodeChef</FormLabel>
            <FormInput
              placeholder='https://codechef.com/username'
              {...register('codechef', { required: false })}
              helperText={errors?.codechef?.message}
              error={!!errors?.codechef}
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CodingProfiles;
