"use client";

import React from "react";
import { Grid } from "@mui/material";
import ChromeExtension from "./chrome-extension";
import WhatsApp from "./whatsapp";
import Website from "./website";

const Product = () => {
  return (
    <Grid
      sx={{
        width: { xs: "360px", md: "900px" },
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
    >
      <Grid>
        <Website />
      </Grid>
      <Grid>
        <ChromeExtension />
      </Grid>
      <Grid>
        <WhatsApp />
      </Grid>
    </Grid>
  );
};

export default Product;
