import React, { useEffect } from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { FormInput, FormLabel, InputContainer, Row } from './styles';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useFormContext } from 'react-hook-form';

const PersonalOverview = ({
  collapsed,
  toggleCollapse
}: {
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  const { register } = useFormContext();

  const {
    fields: achievements,
    append,
    remove
  } = useFieldArray({
    name: 'achievements'
  });

  return (
    <Grid>
      <Heading
        title='Personal Overview'
        icon={<SchoolIcon />}
        collapsed={collapsed}
        toggleCollapse={() => toggleCollapse()}
      />

      {!collapsed && (
        <Grid
          sx={{
            borderRadius: '0px 0px 20px 20px',
            background: 'rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(20px)',
            padding: '25px 15px'
          }}
        >
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
        </Grid>
      )}
    </Grid>
  );
};

export default PersonalOverview;
