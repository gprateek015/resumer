import { Grid, Typography } from "@mui/material";
import icon from "@/assets/onboarding6.png";
import whatsappIcon from "@/assets/whatsapp.png";
import Image from "next/image";

const WhatsApp = () => {
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
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Image
          src={whatsappIcon}
          alt="icon"
          style={{
            height: "70px",
            width: "70px",
            padding: "10px",
          }}
          priority={true}
        />
        <Typography>
          If you want the ease of resume optimization on your phone and you
          aren't able to run the extension then you can use our whatsapp bot.
          Just forward us the URL of the job description page and get a
          customized resume from the details of your linked account
        </Typography>
      </Grid>
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
            width: "75px",
          }}
          priority={true}
        />
      </Grid>
    </Grid>
  );
};

export default WhatsApp;
