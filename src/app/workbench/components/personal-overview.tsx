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
import PersonalOverviewDetails from '@/components/profile-details/personal-overview';

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
          <PersonalOverviewDetails />
        </Grid>
      )}
    </Grid>
  );
};

export default PersonalOverview;
