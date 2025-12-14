import { Box, Typography } from "@mui/material";
import React, { type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../../styles/InlineStyles";

export default function History(): JSX.Element {
  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          History
        </Typography>
      </Box>
    </Box>
  );
}
