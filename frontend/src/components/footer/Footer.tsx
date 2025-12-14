import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import footerStyles from "./Footer.module.scss";
import { getAppFooterHeight } from "../.././funcs/spacing";
import * as React from "react";
import appStyles from "../.././styles/App.module.scss";
import type { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <Box className={footerStyles.footerContainer}>
      <Paper
        elevation={1}
        className={[
          appStyles.flexCol,
          appStyles.flexCenter,
          footerStyles.footer,
        ].join(" ")}
        style={{ height: getAppFooterHeight() }}
      >
        <Typography component={"div"} variant="overline">
          Starcraft II Improved Ladder (2025 - {new Date().getFullYear()})
        </Typography>
      </Paper>
    </Box>
  );
}
