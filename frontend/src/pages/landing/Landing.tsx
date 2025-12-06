import { Box, Typography } from "@mui/material";
import React, { type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../.././styles/InlineStyles";

export default function Landing(): JSX.Element {
  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Typography variant="h1">Landing</Typography>
    </Box>
  );
}
