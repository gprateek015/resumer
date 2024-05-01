"use client";

import React from "react";
import { Grid } from "@mui/material";
import ChromeExtension from "./chrome-extension";
import WhatsApp from "./whatsapp";
import Website from "./website";
import { space_grotest } from "@/font-family";

const Product = () => {
  return (
    <Grid
      sx={{
        width: { xs: "360px", md: "930px" },
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        MsOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      className={space_grotest.className}
    >
      <Grid>
        <ChromeExtension />
      </Grid>
      <Grid>
        <WhatsApp />
      </Grid>
      <Grid>
        <Website />
      </Grid>
    </Grid>
  );
};

export default Product;
