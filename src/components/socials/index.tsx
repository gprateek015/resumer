"use client";

import { Grid } from "@mui/material";
import xIcon from "@/assets/x.png";
import instagramIcon from "@/assets/instagram.png";
import gmailIcon from "@/assets/gmail.png";
import Image from "next/image";

const Socials = () => {
  return (
    <Grid
      sx={{
        position: "fixed",
        left: "12px",
        bottom: { xs: "5px", md: "10px" },
      }}
    >
      <a href="https://instagram.com/resumercloud" target="_blank">
        <Image
          src={instagramIcon}
          alt="icon"
          style={{
            height: "20px",
            width: "20px",
            padding: "6px",
          }}
          priority={true}
        />
      </a>
      <a href="mailto:neerajgupta12300@gmail.com" target="_blank">
        <Image
          src={gmailIcon}
          alt="icon"
          style={{
            height: "20px",
            width: "20px",
            padding: "6px",
          }}
          priority={true}
        />
      </a>
      <a href="https://x.com/resumercloud" target="_blank">
        <Image
          src={xIcon}
          alt="icon"
          style={{
            height: "20px",
            width: "20px",
            padding: "6px",
          }}
          priority={true}
        />
      </a>
    </Grid>
  );
};

export default Socials;
