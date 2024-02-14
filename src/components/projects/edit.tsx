import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  FormHelperText,
  Grid,
  IconButton,
  Button as MuiButton,
  Typography
} from '@mui/material';

import {
  Button,
  FormInput,
  FormLabel,
  selectStyles
} from '../onboarding-questions/styles';
import { Project } from '@/types';
import { useDispatch, useSelector } from '@/redux/store';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { postProject, updateProject } from '@/actions/project';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';
import SkillsInput, { CreatableSkill } from '../skills-input';

export type ProjectData = Project & {
  url?: string;
};

const projectUrlTypeOptions = [
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

const getDefaultProjectUrl = (value?: ProjectData) => {
  if (value?.code_url)
    return projectUrlTypeOptions.find(opt => opt.value === 'code_url');
  if (value?.live_url)
    return projectUrlTypeOptions.find(opt => opt.value === 'live_url');
  if (value?.video_url)
    return projectUrlTypeOptions.find(opt => opt.value === 'video_url');
  return null;
};

const ProjectEdit = ({
  handleCancel,
  project,
  onSubmit,
  buttonText,
  apiError: apiErrors
}: {
  handleCancel: Function;
  project?: Project;
  onSubmit: SubmitHandler<ProjectData>;
  buttonText: string;
  apiError?: string | object | null;
}) => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState<string | null>(null);
  const [projectUrlType, setProjectUrl] = useState(
    getDefaultProjectUrl(project)
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    reset
  } = useForm();

  const {
    fields: description,
    append,
    remove
  } = useFieldArray({
    name: 'description',
    control
  });

  const skillsRequired: string[] = watch('skills_required') || [];

  const onProjectTypeChange = (val: any) => {
    setProjectUrl(val);
    setValue('code_url', undefined);
    setValue('live_url', undefined);
    setValue('video_url', undefined);
  };

  const handleSkillDelete = (skill: string) => {
    setValue(
      'skills_required',
      skillsRequired.filter(skll => skill !== skll)
    );
  };

  const handleSkillAppend = (skill: string) => {
    if (!skillsRequired.find(skll => skill === skll))
      setValue('skills_required', [...skillsRequired, skill]);
  };

  useEffect(() => {
    if (project) {
      (Object.keys(project || {}) as Array<keyof Project>).forEach(key => {
        setValue(key, project[key]);
      });
    } else {
      const newValues = {
        name: undefined,
        skills_required: [],
        code_url: undefined,
        live_url: undefined,
        video_url: undefined,
        description: ['']
      };

      (Object.keys(newValues) as Array<keyof typeof newValues>).map(key => {
        setValue(key, newValues[key]);
      });
    }
  }, [project]);

  useEffect(() => {
    reset({
      description: [''],
      ...(project && project),
      _id: undefined,
      user_id: undefined
    });
  }, [project]);

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
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Box>
        <FormLabel>Name of the project</FormLabel>
        <FormInput
          {...register('name', { required: 'Project Name is required!' })}
          placeholder='Eg:- Resumer'
        />
      </Box>
      <Box>
        <FormLabel>Project Link</FormLabel>
        <Grid
          sx={{
            display: 'flex',
            gap: '15px'
          }}
        >
          <Box sx={{ minWidth: '150px' }}>
            <Select
              options={projectUrlTypeOptions}
              styles={selectStyles}
              value={projectUrlType}
              onChange={(val: any) => onProjectTypeChange(val)}
              isClearable
            />
          </Box>
          <FormInput
            {...register(projectUrlType?.value || 'code_url', {
              required: false
            })}
            placeholder='https://project-url.com'
          />
        </Grid>
      </Box>
      <Box>
        <FormLabel>Skills Required</FormLabel>
        <SkillsInput
          onChange={(skill: CreatableSkill) => handleSkillAppend(skill.name)}
        />
      </Box>
      {skillsRequired?.length > 0 && (
        <Grid
          sx={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}
        >
          {skillsRequired.map((skill: string, ind: number) => (
            <Chip
              label={skill}
              key={ind}
              onDelete={() => handleSkillDelete(skill)}
              sx={{
                color: 'white',
                border: '1px solid white',
                '& svg': {
                  color: '#ffffff80 !important'
                }
              }}
            />
          ))}
        </Grid>
      )}
      <Box>
        <FormLabel>Please describe your project below</FormLabel>
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
  );
};

export default ProjectEdit;
