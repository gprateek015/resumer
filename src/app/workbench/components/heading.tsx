import React, { ReactElement } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';

const Heading = ({
  title,
  icon,
  collapsed = true,
  toggleCollapse
}: {
  title: string;
  icon: ReactElement;
  collapsed: boolean;
  toggleCollapse: Function;
}) => {
  return (
    <Grid
      sx={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        borderRadius: collapsed ? '20px' : '20px 20px 0px 0px',
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(20px)',
        width: '100%',
        padding: '15px 25px',
        position: 'relative'
        // zIndex: -1
      }}
    >
      {icon}
      <Typography>{title}</Typography>
      <IconButton
        sx={{
          position: 'absolute',
          right: '25px'
        }}
        onClick={() => toggleCollapse()}
      >
        {collapsed ? (
          <DownIcon
            sx={{
              color: '#686868'
            }}
          />
        ) : (
          <UpIcon
            sx={{
              color: '#686868'
            }}
          />
        )}
      </IconButton>
    </Grid>
  );
};

export default Heading;
