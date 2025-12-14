import { Box } from "@mui/material";
import React, { type JSX } from "react";

import appStyles from "../.././styles/App.module.scss";
import { centerContent } from "../../styles/InlineStyles";
import RegistrationForm from "../../components/form/RegistrationForm";

export default function Register(): JSX.Element {
  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...centerContent }}
    >
      <RegistrationForm />
    </Box>
  );
}
