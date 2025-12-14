import { Box, Button, Typography } from "@mui/material";
import React, { type JSX } from "react";

import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../../styles/InlineStyles";
import BasicTable from "../../components/table/Table";
import { LobbyTableHeaders } from "../../components/table/TableHeaders";

export default function Lobby(): JSX.Element {
  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          Lobby
        </Typography>
      </Box>
      <Box>
        <Button variant="outlined">Create Match</Button>
      </Box>
      <Box className={appStyles.paragraphSpacing}>
        <BasicTable tableHeaders={LobbyTableHeaders} />
      </Box>
    </Box>
  );
}
