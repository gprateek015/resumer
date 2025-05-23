import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  Typography
} from '@mui/material';

import {
  Button,
  FormInput,
  FormLabel,
  selectStyles
} from '../onboarding-questions/styles';
import { Project, Skill } from '@/types';
import { DnDBackendContext, useDispatch, useSelector } from '@/redux/store';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';
import SkillsInput, { CreatableSkill } from '../skills-input';
import DraggableChip from '../profile-details/dragable-chip';
import { DndProvider } from 'react-dnd';

export type ProjectData = Project & {
  url?: string;
};

const ProjectEdit = ({
  handleCancel,
  project,
  onSubmit,
  buttonText,
  apiError: apiErrors,
  trySaving
}: {
  handleCancel: Function;
  project?: Project;
  onSubmit: SubmitHandler<ProjectData>;
  buttonText: string;
  apiError?: string | object | null;
  trySaving?: boolean;
}) => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

  const Backend = useContext(DnDBackendContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    getValues
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

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const updatedList = getValues()['skills_required'];
    const [movedItem] = updatedList.splice(dragIndex, 1);
    updatedList.splice(hoverIndex, 0, movedItem);

    setValue('skills_required', updatedList);
    return;
  }, []);

  useEffect(() => {
    reset({
      description: [''],
      skills_required: [],
      ...(project && project)
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

  useEffect(() => {
    if (trySaving) {
      handleSubmit(onSubmit)();
    }
  }, [trySaving]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '10px',
        borderRadius: '5px'
        // backdropFilter: 'blur(20px)'
      }}
    >
      <Box>
        <FormLabel>Name of the project</FormLabel>
        <FormInput
          {...register('name', { required: 'Project Name is required!' })}
          placeholder='Enter your project name'
        />
      </Box>
      <Box>
        <FormLabel>Code Url</FormLabel>
        <FormInput
          {...register('code_url', {
            required: false
          })}
          placeholder='https://project-url.com'
        />
      </Box>
      <Box>
        <FormLabel>Live Url</FormLabel>
        <FormInput
          {...register('live_url', {
            required: false
          })}
          placeholder='https://project-url.com'
        />
      </Box>
      <Box>
        <FormLabel>Video Url</FormLabel>
        <FormInput
          {...register('video_url', {
            required: false
          })}
          placeholder='https://project-url.com'
        />
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
          <DndProvider backend={Backend}>
            {skillsRequired.map((skill: string, ind: number) => (
              <DraggableChip
                label={skill}
                key={ind}
                onDelete={() => handleSkillDelete(skill)}
                moveCard={moveCard}
                skillType={'technical_skills'}
                index={ind}
              />
            ))}
          </DndProvider>
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
  );
};

export default ProjectEdit;
