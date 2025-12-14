import { Box, Typography } from "@mui/material";
import React, { type JSX } from "react";

import appStyles from "../.././styles/App.module.scss";
import faqStyles from "./Faq.module.scss";
import { pageWrapper } from "../.././styles/InlineStyles";
import type { FaqSection } from "./FaqInterfaces";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const faqListItem = (text: string): JSX.Element => {
  return (
    <ListItem>
      <Typography variant="body1">{text}</Typography>
    </ListItem>
  );
};

const faqSections: FaqSection[] = [
  {
    title: "What is Starcraft II Improved Ladder?",
    content: (
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="body1">
          {" "}
          Starcraft II Improved Ladder is a matchmaking service for the game
          Starcraft II. We aim to provide a platform for players off all skill
          levels to enjoy Starcraft II.
        </Typography>
      </Box>
    ),
  },
  {
    title: "What features does Starcraft II Improved Ladder provide?",
    content: (
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="body1">
          The application provides the following services:
        </Typography>
        <List>
          {faqListItem("Unranked Matchmaking")}
          {faqListItem("Ranked Ladder")}
        </List>
      </Box>
    ),
  },
  {
    title: "Why would I use this service instread of the built in ladder?",
    content: (
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="body1">
          The platform offers a number of benefits of the traditional Starcraft
          II ladder:
        </Typography>
        {faqListItem("Per-Matchup MMR")}
        {faqListItem("Smurfing Protection")}
        {faqListItem("Griefing Protection")}
        {faqListItem("Fellowship and Community")}
      </Box>
    ),
  },
];

export default function Faq(): JSX.Element {
  const faqSection = (faqSections: FaqSection[]): JSX.Element => {
    const sections: JSX.Element[] = [];
    Object.values(faqSections).forEach((section: FaqSection, index: number) => {
      sections.push(
        <Box key={`faqSection_${index}`} className={faqStyles.sectionContainer}>
          <Box className={appStyles.paragraphSpacing}>
            <Typography variant="h4" className={faqStyles.sectionTitle}>
              {section.title}
            </Typography>
          </Box>
          {section.content}
        </Box>
      );
    });
    return sections;
  };

  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          FAQ
        </Typography>
      </Box>

      {faqSection(faqSections)}
    </Box>
  );
}
