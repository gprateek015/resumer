import React from 'react';
import { Grid } from '@mui/material';
import Select from 'react-select';
import { contries } from '@/constants';
import { Heading, Subtitle, selectStyles, FormInput, FormLabel, Option, Options } from './styles';

const ContactDetails = () => {
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
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <FormLabel>Please provide us with your phone number</FormLabel>
        <FormInput />
        <FormLabel>Your Linkedin for the recruiters</FormLabel>
        <FormInput />
        <FormLabel>Lets show your twitter to everyone</FormLabel>
        <FormInput />
        <FormLabel>
          Please share your current adress which you would like to include in your
          resume
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
    </Grid>
  );
};

export default ContactDetails;
