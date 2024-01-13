import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, Grid, IconButton } from '@mui/material';

import {
  Button,
  FormInput,
  FormLabel,
  Heading,
  Option,
  Options,
  PageNavButton,
  selectStyles
} from './styles';
import { PageNavPropsType } from '.';
import { Project } from '@/types';
import ShortUniqueId from 'short-unique-id';
import { useDispatch, useSelector } from '@/redux/store';
import { useFieldArray, useForm } from 'react-hook-form';
import { postProject, updateProject } from '@/actions/project';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';

type ProjectData = Project & {
  descriptions?: {
    id: string;
    value: string;
  }[];
  url?: string;
};

const projectUrlOptions = [
  {
    label: 'Code Url',
    value: 'code_url'
  },
  {
    label: 'Live Url',
    value: 'live_url'
  },
  {
    label: 'Video Url',
    value: 'video_url'
  }
];

const getDefaultProjectUrl = (value: ProjectData) => {
  if (value.code_url)
    return projectUrlOptions.find(opt => opt.value === 'code_url');
  if (value.live_url)
    return projectUrlOptions.find(opt => opt.value === 'live_url');
  if (value.video_url)
    return projectUrlOptions.find(opt => opt.value === 'video_url');
  return null;
};

const ProjectDetailsEdit = ({
  handleCancel,
  value
}: {
  handleCancel: Function;
  value: Project;
}) => {
  const uid = new ShortUniqueId({ length: 5 });
  const dispatch = useDispatch();
  const { errors: apiErrors } = useSelector(state => state.onboarding);
  const [apiError, setApiError] = useState<string | null>(null);
  const [projectUrl, setProjectUrl] = useState(getDefaultProjectUrl(value));

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
          })),
          url: value.code_url || value.live_url || value.video_url
        }
      : ({
          name: undefined,
          skills_required: undefined,
          descriptions: [{ id: uid.rnd(), value: '' }]
        } as ProjectData)
  });

  const {
    fields: description,
    append,
    remove
  } = useFieldArray({
    name: 'descriptions',
    control
  });

  const onSubmit = async (data: ProjectData) => {
    setApiError(null);

    const newData = {
      ...data,
      description: data.descriptions?.map(desc => desc.value),
      descriptions: undefined,
      url: undefined
    };
    if (value && value?.id)
      await dispatch(
        updateProject({
          data: { ...newData, id: undefined, user_id: undefined },
          id: value?.id
        })
      );
    else await dispatch(postProject(newData));
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
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        my: '20px'
      }}
    >
      <FormLabel>Name of the project</FormLabel>
      <FormInput
        {...register('name', { required: 'Project Name is required!' })}
      />
      <FormLabel>Project Link</FormLabel>
      <Grid
        sx={{
          display: 'flex',
          gap: '15px'
        }}
      >
        <Box sx={{ minWidth: '150px' }}>
          <Select
            options={projectUrlOptions}
            styles={selectStyles}
            value={projectUrl}
            onChange={(val: any) => setProjectUrl(val)}
            isClearable
          />
        </Box>
        <FormInput
          {...register('url', { required: false })}
          placeholder='https://project-url.com'
        />
      </Grid>
      <FormLabel>Please describe your project below</FormLabel>
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
          <FormHelperText error>{errors?.description?.message}</FormHelperText>
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
  );
};

export default ProjectDetailsEdit;
