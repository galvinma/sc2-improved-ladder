import { Box } from "@mui/material";
import React, { type JSX } from "react";

import appStyles from "../.././styles/App.module.scss";
import { centerContent } from "../../styles/InlineStyles";
import LoginForm from "../../components/form/LoginForm";

export default function Login(): JSX.Element {
  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...centerContent }}
    >
      <LoginForm />
    </Box>
  );
}
