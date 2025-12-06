/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box } from "@mui/material";
import navbarStyles from "./Navbar.module.scss";
import React from "react";

interface NavbarActionsProps {
  navbarActions: any[];
}

export default function NavbarActions({
  navbarActions,
}: NavbarActionsProps): JSX.Element {
  return (
    <Box
      className={`${navbarStyles.flexCol as string} ${
        navbarStyles.iconsContainer as string
      }`}
    >
      {navbarActions}
    </Box>
  );
}
