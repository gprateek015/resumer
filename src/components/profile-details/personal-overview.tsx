import React from 'react';

import SchoolIcon from '@mui/icons-material/School';
import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { InputContainer, Row } from './styles';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, FormInput, FormLabel } from '../onboarding-questions/styles';

const PersonalOverviewContainer = () => {
  const { register } = useFormContext();
  const {
    fields: achievements,
    append,
    remove
  } = useFieldArray({
    name: 'achievements'
  });
  return (
    <>
      <Row>
        <InputContainer>
          <FormLabel>Name</FormLabel>
          <FormInput {...register('name')} />
        </InputContainer>
        <InputContainer>
          <FormLabel>Phone No.</FormLabel>
          <FormInput {...register('phone')} />
        </InputContainer>
      </Row>
      <InputContainer>
        <FormLabel>Email address</FormLabel>
        <FormInput {...register('email')} />
      </InputContainer>
      <Row>
        <InputContainer>
          <FormLabel>City</FormLabel>
          <FormInput {...register('city')} />
        </InputContainer>
        <InputContainer>
          <FormLabel>State</FormLabel>
          <FormInput {...register('state')} />
        </InputContainer>
      </Row>

      <Divider
        sx={{
          borderColor: '#ffffff87',
          my: '20px'
        }}
      />

      <FormLabel>Achievements</FormLabel>
      <Grid>
        {achievements?.map((ach, ind: number) => (
          <Box key={ach.id} display={'flex'} gap='10px' mb='10px'>
            <FormInput
              {...register(`achievements.${ind}`)}
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
    </>
  );
};

export default PersonalOverviewContainer;
