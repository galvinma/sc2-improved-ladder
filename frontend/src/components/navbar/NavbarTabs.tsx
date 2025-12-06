import { Box, Button, Typography } from "@mui/material";
import navbarStyles from "./Navbar.module.scss";
import React, { type JSX } from "react";
import appStyles from "../.././styles/App.module.scss";
import { useNavigate } from "react-router";

interface NavbarTabsProps {
  tabs: string[];
}

export default function NavbarTabs({ tabs }: NavbarTabsProps): JSX.Element {
  const navigate = useNavigate();

  const handleTo = (tab: string): void => {
    navigate(tab.toLowerCase());
  };

  const handleActive = (tab: string): boolean => {
    // TODO As we add more routes we should refactor this into something more explicit
    return window.location.href.includes(tab.toLowerCase());
  };

  return (
    <Box className={navbarStyles.tabsContainer}>
      <Box className={navbarStyles.tabsStack}>
        {tabs.map((tab) => (
          <Button
            onClick={() => {
              handleTo(tab);
            }}
            key={tab}
            className={navbarStyles.navTabBtn}
          >
            <Typography
              variant="button"
              className={[
                navbarStyles.navTabBtnText,
                appStyles.primaryFont,
                handleActive(tab) ? navbarStyles.activeNavTabBtn : "",
              ].join(" ")}
            >
              {tab}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
