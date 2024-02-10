import { Grid } from '@mui/material';
import React from 'react';
import Heading from './heading';
import SchoolIcon from '@mui/icons-material/School';

import ProfileLinksContainer from '@/components/profile-details/profile-links';

const ProfileLinks = ({
  collapsed,
  toggleCollapse
}: {
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  return (
    <Grid>
      <Heading
        title='Profile Links'
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
            padding: '10px 15px 25px 15px'
          }}
        >
          <ProfileLinksContainer />
        </Grid>
      )}
    </Grid>
  );
};

export default ProfileLinks;
