import React from 'react';
import { Grid } from '@mui/material';

import { FormInput, FormLabel, Heading, Option, Options } from './styles';

const CodingProfiles = () => {
  return (
    <Grid>
      <Heading mb='20px'>
        Please provide us all your<br />
        coding profiles
      </Heading>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <FormLabel>Leetcode</FormLabel>
        <FormInput placeholder='https://leetcode.com/username'/>
        <FormLabel>Codeforces</FormLabel>
        <FormInput placeholder='https://codeforces.com/username'/>
        <FormLabel>Geeksforgeeks</FormLabel>
        <FormInput placeholder='https://geeksforgeeks.com/username'/>
        <FormLabel>HackerRank</FormLabel>
        <FormInput placeholder='https://hackerrank.com/username'/>
        <FormLabel>HackerEarth</FormLabel>
        <FormInput placeholder='https://hackerearth.com/username'/>
        <FormLabel>AtCoder</FormLabel>
        <FormInput placeholder='https://atcoder.com/username'/>
        <FormLabel>CodeChef</FormLabel>
        <FormInput placeholder='https://codechef.com/username'/>
      </Grid>
    </Grid>
  );
};

export default CodingProfiles;
