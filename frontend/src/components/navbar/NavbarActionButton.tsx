/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button } from "@mui/material";
import navbarStyles from "./Navbar.module.scss";
import React from "react";

interface NavbarActionButtonProps {
  icon: JSX.Element;
  text: JSX.Element;
  onClickFunc: any | ((e: any) => void);
}

export default function NavbarActionButton({
  icon,
  text,
  onClickFunc,
}: NavbarActionButtonProps): JSX.Element {
  return (
    <Box className={navbarStyles.iconContainer}>
      <Button
        variant="text"
        className={navbarStyles.navActionBtn}
        onClick={onClickFunc}
      >
        {icon}
        {text}
      </Button>
    </Box>
  );
}
