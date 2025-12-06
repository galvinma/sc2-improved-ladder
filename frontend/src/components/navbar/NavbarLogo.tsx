import Box from "@mui/material/Box";
import navbarStyles from "./Navbar.module.scss";
import React, { type JSX } from "react";
import { Typography } from "@mui/material";

export default function NavbarLogo(): JSX.Element {
  return (
    <Box className={navbarStyles.logoContainer}>
      <Typography variant="h5">Starcraft2 Improved Ladder</Typography>
    </Box>
  );
}
