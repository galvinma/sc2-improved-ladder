import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import { pageWrapper } from "../../styles/InlineStyles";
import { useParams } from "react-router";
import { getData } from "../../funcs/api";

export default function Match(): JSX.Element {
  const { id } = useParams();
  const [map, setMap] = useState("");

  useEffect(() => {
    getData({
      endpoint: `match/${id}`,
    })
      .then((res) => {
        setMap(res.data.map);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          Match
        </Typography>
      </Box>
      <Box className={appStyles.paragraphSpacing}>
        <Box>{id}</Box>
        <Box>{map}</Box>
      </Box>
    </Box>
  );
}
