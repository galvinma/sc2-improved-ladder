import { Box } from "@mui/material";
import React, { type JSX } from "react";
import { pageWrapper } from "../.././styles/InlineStyles";
import CircularProgress from "@mui/material/CircularProgress";
import appStyles from "../.././styles/App.module.scss";

export default function Loading(): JSX.Element {
  return (
    <Box className={appStyles.flexCenter} style={{ ...pageWrapper }}>
      <CircularProgress />
    </Box>
  );
}
