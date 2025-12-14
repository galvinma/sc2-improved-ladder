import { Box, Typography } from "@mui/material";
import React, { type JSX } from "react";

import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../../styles/InlineStyles";
import LadderForm from "../../components/form/LadderForm";

export default function Versus(): JSX.Element {
  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          Versus
        </Typography>
      </Box>

      <Box className={appStyles.paragraphSpacing}>
        <LadderForm />
      </Box>
    </Box>
  );
}
