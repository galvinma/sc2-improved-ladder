import { Box, Typography } from "@mui/material";
import React, { type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../../styles/InlineStyles";
import { useParams } from "react-router";

export default function Match(): JSX.Element {
  const { id } = useParams();
  console.log(id);

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
      <Box className={appStyles.paragraphSpacing}></Box>
    </Box>
  );
}
