import { CircularProgress, Grid } from '@mui/material';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Grid
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress sx={{ color: 'white' }} />
    </Grid>
  );
}
