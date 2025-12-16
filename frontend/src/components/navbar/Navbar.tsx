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
    <Box
      className={navbarStyles.appBar}
      style={{
        boxShadow: "none",
        position: "sticky",
      }}
    >
      <Box className={navbarStyles.toolbarWrapper}>
        {authenticated ? <InternalNavbar /> : <ExternalNavbar />}
      </Box>
      <GradientBar />
    </Box>
  );
}
