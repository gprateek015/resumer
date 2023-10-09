import React from 'react';
import { Grid } from '@mui/material';
import Select from 'react-select';
import { cgpa, branch } from '@/constants';

import { FormInput, FormLabel, Heading, selectStyles, Option, Options } from './styles';

const EducationalDetails = () => {
    const cgpaOption = cgpa.map(cgpa => ({
        label: cgpa,
        value: cgpa
    }));

    const branchOption = branch.map(branch => ({
        label: branch,
        value: branch
    }));

    return (
        <Grid>
            <Heading mb='20px'>
                Kindly provide us the following <br />
                details regarding your education
            </Heading>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                <FormLabel>Institue / College name</FormLabel>
                <FormInput />
                <FormLabel>Major / Branch</FormLabel>
                <Select
                    options={branchOption}
                    styles={selectStyles}
                    placeholder='Major'
                />
                <FormLabel>CGPA obtained</FormLabel>
                <Select
                    options={cgpaOption}
                    styles={selectStyles}
                    placeholder='CGPA'
                />
                <Grid
                    sx={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'space-between'
                    }}
                >
                    <Grid>
                        <FormLabel mb='15px'>Start Date</FormLabel>
                        <FormInput type='date' />
                    </Grid>
                    <Grid>
                        <FormLabel mb='15px'>End Date</FormLabel>
                        <FormInput type='date' />
                    </Grid>
                </Grid>
                <FormLabel>Location</FormLabel>
                <FormInput />
            </Grid>
        </Grid>
    );
};

export default EducationalDetails;
