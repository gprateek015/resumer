import React, { useEffect } from 'react';
import { Box, Grid, IconButton } from '@mui/material';

import {
  Button,
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
import { useFieldArray, useForm } from 'react-hook-form';
import { updateUser } from '@/actions/user';
import { updateOnboardingData } from '@/redux/slice/onboarding';
import { space_grotest } from '@/font-family';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';

type LinkNameType = 'leetcode' | 'codeforces' | 'geeksforgeeks' | 'codechef';

type FormType = {
  leetcode: string;
  codeforces: string;
  geeksforgeeks: string;
  codechef: string;
  other: {
    name: string;
    link?: string;
  }[];
};

const CodingProfiles = ({ prevPage, nextPage }: PageNavPropsType) => {
  const dispatch = useDispatch();
  const {
    data: { profile_links },
    errors: apiErrors
  } = useSelector(state => state.onboarding);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm<FormType>({
    defaultValues: {
      leetcode: '',
      codeforces: '',
      geeksforgeeks: '',
      codechef: '',
      other: []
    }
  });

  const {
    fields: otherLinks,
    append,
    remove
  } = useFieldArray({
    name: 'other',
    control
  });

  const other_links = watch('other');

  const onAddOtherLink = () => {
    if (
      !other_links.length ||
      other_links[other_links.length - 1].name ||
      other_links[other_links.length - 1].link
    ) {
      append({
        name: '',
        link: ''
      });
    }
  };

  const onSubmit = async (data: FormType) => {
    let finalData = [
      ...data.other,
      {
        name: 'leetcode',
        link: data.leetcode
      },
      {
        name: 'codechef',
        link: data.codechef
      },
      {
        name: 'codeforces',
        link: data.codeforces
      },
      {
        name: 'geeksforgeeks',
        link: data.geeksforgeeks
      }
    ];
    finalData = finalData.filter(data => data.link);

    dispatch(updateOnboardingData({ profile_links: finalData }));
    nextPage();
  };

  useEffect(() => {
    setValue('other', []);
    for (let profile of profile_links) {
      if (
        profile.name === 'leetcode' ||
        profile.name === 'codeforces' ||
        profile.name === 'geeksforgeeks' ||
        profile.name === 'codechef'
      )
        setValue(profile.name, profile.link as string);
      else
        append({
          name: profile.name,
          link: profile.link
        });
    }
  }, [profile_links]);

  return (
    <PageContainer nextPage={handleSubmit(onSubmit)} prevPage={prevPage}>
      <Grid>
        <Heading mb='20px'>Please provide us all your coding profiles</Heading>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            backdropFilter: 'blur(20px)',
            p: '20px',
            borderRadius: '20px',
            border: '1px solid #ffffff87'
          }}
          className={space_grotest.className}
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
            <FormLabel>CodeChef</FormLabel>
            <FormInput
              placeholder='https://codechef.com/username'
              {...register('codechef', { required: false })}
              helperText={errors?.codechef?.message}
              error={!!errors?.codechef}
            />
          </Box>
          <Box>
            <FormLabel>Other Coding Profiles</FormLabel>
            {otherLinks?.map((profileLink: any, ind: number) => (
              <Box display={'flex'} gap='10px' key={profileLink.id} mb='10px'>
                <FormInput
                  {...register(`other.${ind}.name`)}
                  placeholder='Codeforces'
                  sx={{
                    flexBasis: '30%'
                  }}
                />
                <FormInput
                  {...register(`other.${ind}.link`)}
                  placeholder='https://codeforces.com/username'
                  sx={{
                    flexGrow: '1'
                  }}
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
          </Box>
          <Box>
            <Button
              startIcon={<AddIcon />}
              fullWidth
              onClick={() => onAddOtherLink()}
            >
              Add another coding profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CodingProfiles;
