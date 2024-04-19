"use client";

import React from "react";
import { Grid } from "@mui/material";
import Product from "./product";
import Founders from "./founders";
import { space_grotest } from "@/font-family";

const About = () => {
  return (
    <Grid
      sx={{
        width: { xs: "360px", md: "900px" },
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(20px)",
        padding: "26px",
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
        <Product />
      </Grid>
      <Grid>
        <Founders />
      </Grid>
    </Grid>
  );
};

export default About;
