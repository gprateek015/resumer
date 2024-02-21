import { Grid, Typography } from "@mui/material";

const Website = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      <Grid
        sx={{
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px 10px 5px 20px",
        }}
      >
        <Typography>
          You can always login to resumer to do things manually and edit your
          resumes as per your requirements
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Website;
