'use client';

import { Button, Typography, styled } from '@mui/material';

export const SignupBtn = styled(Button)({
  background:
    'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
  color: 'transparent',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  borderRadius: '20px 20px 20px 0px',
  // border: '2px solid transparent',
  position: 'relative',
  padding: '8px 20px',
  boxShadow: '0px 0px 15px 0px rgba(244, 244, 244, 0.48) inset',

  '&::before': {
    content: "''",
    position: 'absolute',
    inset: 0,
    borderRadius: '20px 20px 20px 0px',
    padding: '2px',
    background:
      'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor'
  }
});

export const NavLink = styled(Typography)(({ active }: { active: string }) => ({
  color: active === 'true' ? 'transparent' : 'white',
  fontSize: '18px',
  fontWeight: '400',
  background:
    'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  textDecoration: 'none'
}));
