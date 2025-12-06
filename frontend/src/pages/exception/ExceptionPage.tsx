import { Box, Typography } from "@mui/material";
import exceptionPageStyles from "./ExceptionPage.module.scss";
import React, { type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../.././styles/InlineStyles";

interface ExceptionPageProps {
  headerText: string;
  additionalText?: JSX.Element | null;
}

export default function ExceptionPage(props: ExceptionPageProps): JSX.Element {
  return (
    <Box
      className={[
        appStyles.whiteBackground,
        exceptionPageStyles.exceptionWrapper,
        appStyles.flexCol,
        appStyles.flexCenter,
      ].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box
        className={[appStyles.paragraphSpacing, appStyles.flexCenter].join(" ")}
      >
        <Typography variant="h5">{props.headerText}</Typography>
      </Box>

      {props.additionalText !== null && props.additionalText !== undefined ? (
        <Box
          className={[appStyles.paragraphSpacing, appStyles.flexCenter].join(
            " ",
          )}
        >
          <Typography variant="body1">{props.additionalText}</Typography>
        </Box>
      ) : (
        <span></span>
      )}

      <Box
        className={[appStyles.paragraphSpacing, appStyles.flexCenter].join(" ")}
      >
        <Typography variant="body1">
          If you need help, have found a bug, or would like to suggest a feature
          please send an email to TODO create email.
        </Typography>
      </Box>
    </Box>
  );
}
