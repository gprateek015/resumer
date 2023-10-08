import React from 'react';
import { Grid } from '@mui/material';
import Select from 'react-select';
import { contries } from '@/constants';
import { Heading, Subtitle, selectStyles } from './styles';

const Location = () => {
  const contriesOption = contries.map(country => ({
    label: country,
    value: country
  }));
  return (
    <Grid>
      <Heading mb='20px'>
        Let's start with some of <br />
        your contact details
      </Heading>
      <Subtitle>
        Please share your current adress which you would like to include in your
        resume
      </Subtitle>
      <Grid
        sx={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        mt='20px'
      >
        <Select
          options={contriesOption}
          styles={selectStyles}
          placeholder='Country'
        />
        <Select
          options={contriesOption}
          styles={selectStyles}
          placeholder='State'
        />
        <Select
          options={contriesOption}
          styles={selectStyles}
          placeholder='City'
        />
      </Grid>
    </Grid>
  );
};

export default Location;
