import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import WorkExpDetailDesign from '@/components/work-experiences/detail';
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form';
import { Experience, ProfileLink } from '@/types';
import EduDetailDesign from '@/components/educations/detail';
import ProjectDetailDesign from '@/components/projects/detail';
import {
  Button,
  FormInput,
  FormLabel
} from '@/components/onboarding-questions/styles';
import { firstLetterCapital } from '@/utils';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForever';

const CertificationsContainer = () => {
  const { register } = useFormContext();

  const {
    fields: certificates,
    append,
    remove
  } = useFieldArray({
    name: 'certificates'
  });

  return (
    <Grid
      sx={{
        display: 'flex',
        gap: '10px',
        flexDirection: 'column'
      }}
    >
      {certificates?.map((certificate: any, ind: number) => (
        <Box display={'flex'} gap='10px' key={certificate.id} mb='10px'>
          <FormInput
            {...register(`certificates.${ind}.name`)}
            placeholder='Certificate name'
            sx={{
              flexGrow: '1'
            }}
          />
          <FormInput
            {...register(`certificates.${ind}.link`)}
            placeholder='Public URL of the certificate'
            sx={{
              flexGrow: '1'
            }}
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
      <Box>
        <Button
          startIcon={<AddIcon />}
          fullWidth
          onClick={() =>
            append({
              name: '',
              link: ''
            })
          }
        >
          Add another certificate
        </Button>
      </Box>
    </Grid>
  );
};

export default CertificationsContainer;
