import { Grid, Typography } from "@mui/material";
import icon from "@/assets/onboarding8.png";
import chromeIcon from "@/assets/chrome.webp";
import Image from "next/image";

const ChromeExtension = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      <Grid
        sx={{
          padding: "10px",
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src={icon}
          alt="icon"
          style={{
            height: "100px",
            width: "100px",
          }}
          priority={true}
        />
      </Grid>
      <Grid
        sx={{
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Typography>
          If you need ease on web then simply install and activate our chrome
          extension. Whenever you see any job openning page use this chrome
          extension for downloading the resumes suitable for that particular job
          customised using your details
        </Typography>
        <Image
          src={chromeIcon}
          alt="icon"
          style={{
            height: "70px",
            width: "70px",
            padding: "10px",
          }}
          priority={true}
        />
      </Grid>
    </Grid>
  );
};

export default ChromeExtension;
