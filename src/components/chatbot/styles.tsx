'use client';

import { Chip, Typography, styled } from '@mui/material';

export const ChatTypography = styled(Typography)(
  ({ ind, component }: { ind: number; component?: string }) => ({
    borderRadius: '12px',
    background: '#737373',
    boxShadow: '1px 2px 10px 0px rgba(0, 0, 0, 0.10)',
    padding: '6px 12px',
    maxWidth: 'calc(100% - 80px)',
    float: ind % 2 !== 0 ? 'right' : 'left',
    minHeight: '26px',
    width: 'fit-content'
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
