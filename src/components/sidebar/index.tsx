import React from 'react';
import Image from 'next/image';

import { Box, Button, Grid, Hidden, Typography } from '@mui/material';
import newIcon from '@/assets/icons/new.svg';
import { useRouter } from 'next/navigation';
import ResumeTemplate from '@/assets/resume-template.png';

const SideBar = ({
  selectedTemplate,
  setSelectedTemplate
}: {
  selectedTemplate: number;
  setSelectedTemplate: Function;
}) => {
  const routes = useRouter();
  return (
    <Hidden lgDown>
      <Grid
        sx={{
          minWidth: '190px',
          background:
            'linear-gradient(265deg, rgba(255, 255, 255, 0.12) -63.32%, rgba(51, 50, 50, 0.12) 158.75%)',
          backdropFilter: 'blur(20px)',
          maxHeight: 'calc(100vh - 70px)',
          overflow: 'scroll'
        }}
      >
        <Grid
          sx={{
            textAlign: 'center',
            paddingTop: '40px'
          }}
        >
          <Button
            variant='contained'
            startIcon={<Image className='icon' src={newIcon} alt='' />}
            onClick={() => routes.replace('job-description')}
            sx={{
              borderRadius: '5px',
              border: '1px solid #3f3f3f',
              background: 'rgba(255, 255, 255, 0.1)',
              width: '85%',
              textTransform: 'none',
              position: 'relative',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            New Resume
          </Button>
        </Grid>
        <Box
          sx={{
            marginTop: '20px',
            width: '100%',
            height: '0.8px',
            background:
              'linear-gradient(270deg,#3f3f3f 50%,rgba(63, 63, 63, 0) 89.05%)'
          }}
        />
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            my: '20px'
          }}
        >
          <Typography>Templates</Typography>
          {[1, 1, 1].map((_, i) => (
            <Image
              src={ResumeTemplate}
              alt=''
              width={170}
              key={i}
              style={
                selectedTemplate === i
                  ? {
                      border: '1px solid white',
                      padding: '2px'
                    }
                  : {
                      cursor: 'pointer'
                    }
              }
              onClick={() => setSelectedTemplate(i)}
            />
          ))}
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default SideBar;
