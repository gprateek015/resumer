import { Grid, Typography } from "@mui/material";
import icon from "@/assets/onboarding4.png";
import Image from "next/image";

const Product = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: {xs: "column", md: "row"}
      }}
    >
        <Image
          src={icon}
          alt="icon"
          style={{
            height: "250px",
            width: "250px",
          }}
          priority={true}
        />
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
          Introducing "Resumer" - Your Ultimate Resume Enhancement Companion!
          With Resumer, crafting your perfect resume becomes a seamless journey.
          Simply input your details once, and watch as Resumer's advanced
          toolkit tailors your resume to match any job description flawlessly.
          Our cutting-edge technology ensures your skills shine brightly,
          maximizing your ATS score and increasing your chances of landing that
          dream job. Experience the ease of creating the best resume you've ever
          had with Resumer - your partner in career success!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Product;
