/* eslint-disable @typescript-eslint/no-explicit-any */

import BugReport from "@mui/icons-material/BugReport";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import navbarStyles from "./Navbar.module.scss";
import NavbarActionButton from "./NavbarActionButton";
import NavbarActions from "./NavbarActions";
import NavbarLogo from "./NavbarLogo";
import NavbarTabs from "./NavbarTabs";
import { handleSignOut } from "../.././funcs/auth";

import React from "react";
import appStyles from "../.././styles/App.module.scss";

export default function InternalNavbar(): JSX.Element {
  const openEmailClient = (e: any): void => {
    e.preventDefault();
    window.location.replace(`mailto:`);
  };

  return (
    <Toolbar className={navbarStyles.toolBar}>
      <NavbarLogo />
      <NavbarTabs tabs={["Lobby", "Ladder", "Stats", "Faq"]} />
      <NavbarActions
        navbarActions={[
          <NavbarActionButton
            key={"logOut"}
            icon={<LogoutIcon className={navbarStyles.navIcon} />}
            text={
              <Typography
                variant="button"
                className={[
                  navbarStyles.navTabBtnText,
                  appStyles.primaryFont,
                ].join(" ")}
              >
                Log Out
              </Typography>
            }
            onClickFunc={handleSignOut}
          />,
          <NavbarActionButton
            key={"reportBug"}
            icon={<BugReport className={navbarStyles.navIcon} />}
            text={
              <Typography
                variant="button"
                className={[
                  navbarStyles.navTabBtnText,
                  appStyles.primaryFont,
                ].join(" ")}
              >
                Report Bug
              </Typography>
            }
            onClickFunc={openEmailClient}
          />,
        ]}
      />
    </Toolbar>
  );
}
