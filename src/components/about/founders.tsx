import { Grid, Typography } from "@mui/material";
import icon from "@/assets/onboarding3.png";
import Image from "next/image";

const Founders = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: {xs: "column", md: "row"},
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        sx={{
          width: { xs: "360px", md: "100%" },
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px"
        }}
      >
        <Typography>
          Resumer originated from the vision of Prateek Goyal and Neeraj Gupta,
          dynamic final-year computer science undergraduates. Recognizing the
          landscape of job-seeking, we made a decision of not blending into the
          crowd but getting into real product development by focusing on the
          complete Software Development Life Cycle (SDLC) process. We
          conceptualized, designed, developed, deployed, rigorously tested, and
          scaled its infrastructure, all while independently undertaking the
          challenge of marketing. We were commited to mastering real-world
          software engineering, pushing boundaries, and delivering excellence.
        </Typography>
      </Grid>
      <Image
        src={icon}
        alt="icon"
        style={{
          height: "250px",
          width: "250px",
        }}
        priority={true}
      />
    </Grid>
  );
};

export default Founders;
