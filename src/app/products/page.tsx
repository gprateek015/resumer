import About from '@/components/about';
import Product from '@/components/product';
import { righteous } from '@/font-family';
import { Grid, Typography } from '@mui/material';

import React from 'react';

const Products = () => {
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        padding: { xs: '20px', md: '20px 40px' },
        width: '100%',
        height: 'calc(100vh - 120px)',
        maxHeight: 'calc(100vh - 70px)'
      }}
      className={righteous.className}
    >
      <Typography
        sx={{
          background:
            'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          width: 'fit-content',
          fontWeight: '400',
          fontSize: '2rem',
          lineHeight: '2.3rem',
          letterSpacing: '1.1px',
          padding: '30px'
        }}
      >
        What do we have to offer
      </Typography>
      <Product />
    </Grid>
  );
};

export default Products;
