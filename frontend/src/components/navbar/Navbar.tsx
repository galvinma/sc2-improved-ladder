import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import ExternalNavbar from "./ExternalNavbar";
import GradientBar from "./GradientBar";
import InternalNavbar from "./InternalNavbar";
import navbarStyles from "./Navbar.module.scss";
import React, { type JSX } from "react";

interface NavbarProps {
  authenticated: boolean;
}

export default function Navbar({ authenticated }: NavbarProps): JSX.Element {
  return (
    <Box>
      <AppBar
        className={navbarStyles.appBar}
        elevation={0}
        style={{ background: "transparent", boxShadow: "none" }}
      >
        {authenticated ? <InternalNavbar /> : <ExternalNavbar />}
        <GradientBar />
      </AppBar>
    </Box>
  );
}
