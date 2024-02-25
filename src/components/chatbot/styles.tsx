'use client';

import { Chip, Typography, styled } from '@mui/material';

export const ChatTypography = styled(Typography)(
  ({ ind, component }: { ind: number; component?: string }) => ({
    padding: ind % 2 !== 0 ? '6px 16px' : '12px 16px',
    maxWidth: 'calc(100% - 80px)',
    float: ind % 2 !== 0 ? 'right' : 'left',
    minHeight: '26px',
    width: 'fit-content',
    color: ind % 2 !== 0 ? 'transparent' : 'white',
    fontSize: '0.9rem',
    background:
      'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    lineHeight: '1.5rem',

    borderRadius: ind % 2 !== 0 ? '20px 20px 0px 20px' : '0px 20px 20px 20px',
    position: 'relative',

    boxShadow: '0px 0px 8px 0px rgba(244, 244, 244, 0.48) inset',

    '&::before': {
      content: "''",
      position: 'absolute',
      inset: 0,
      borderRadius: ind % 2 !== 0 ? '20px 20px 0px 20px' : '0px 20px 20px 20px',
      padding: '2px',
      background:
        ind % 2 !== 0
          ? 'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)'
          : 'transparent',
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor'
    }
  })
);

export const OptionTypography = styled(Chip)({
  borderRadius: '12px',
  background: '#737373',
  boxShadow: '1px 2px 10px 0px rgba(0, 0, 0, 0.10)',
  padding: '6px 5px',
  minHeight: '26px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '400',
  fontSize: '14px'
});
