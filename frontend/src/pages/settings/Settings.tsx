import { Box, Typography } from "@mui/material";
import React, { type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import settingsStyles from "./Settings.module.scss";
import { pageWrapper } from "../../styles/InlineStyles";

import { Store } from "../.././store/Store";

export default function Settings(): JSX.Element {
  const email = Store((state) => state.email);
  const firstName = Store((state) => state.firstName);
  const lastName = Store((state) => state.lastName);

  const userSettings: Record<string, string> = {
    Email: email,
    "First Name": firstName,
    "Last Name": lastName,
  };

  const handleUserSettings = (key: string, value: string) => {
    return (
      <Box className={appStyles.paragraphSpacing}>
        <Box className={appStyles.flexRow}>
          {" "}
          <Typography
            variant="body1"
            className={settingsStyles.userSettingsKey}
          >
            {key}
          </Typography>
          <Typography variant="body1">{":"}</Typography>
          <Typography
            variant="body1"
            className={settingsStyles.userSettingsValue}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          Settings
        </Typography>
      </Box>

      {Object.keys(userSettings).map((key, index) => (
        <Box key={`userSetting_${index}`}>
          {handleUserSettings(key, userSettings[key])}
        </Box>
      ))}
    </Box>
  );
}
