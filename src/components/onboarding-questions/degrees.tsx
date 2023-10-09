import React from 'react';
import { Grid, Typography } from '@mui/material';

import { Heading, Option, Options } from './styles';

const Degrees = () => {
    return (
        <Grid>
            <Heading mb='20px'>
                Which all degrees do <br /> you hold?
            </Heading>
            <Typography>
                Select even if you are enrolled.
            </Typography>
            <Options>
                <Option>
                    <Grid>
                        <Typography>Bachelor of</Typography>
                        <Typography>Technology</Typography>
                    </Grid>
                </Option>
                <Option>
                    <Grid>
                        <Typography>Master of</Typography>
                        <Typography>Technology</Typography>
                    </Grid>
                </Option>
                <Option>
                    <Grid>
                        <Typography>Master</Typography>
                        <Typography>in Science</Typography>
                    </Grid>
                </Option>
                <Option>
                    <Typography>Diploma</Typography>
                </Option>
                <Option>
                    <Typography>Other</Typography>
                </Option>
            </Options>
        </Grid>
    );
};

export default Degrees;
