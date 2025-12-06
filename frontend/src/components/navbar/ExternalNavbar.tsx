import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import navbarStyles from "./Navbar.module.scss";
import NavbarActionButton from "./NavbarActionButton";
import NavbarActions from "./NavbarActions";
import NavbarTabs from "./NavbarTabs";
import { checkAuthenticated } from "../.././funcs/auth";
import React, { type JSX } from "react";
import { useNavigate } from "react-router";
import appStyles from "../.././styles/App.module.scss";

import NavbarLogo from "./NavbarLogo";
import { Toolbar } from "@mui/material";

export default function ExternalNavbar(): JSX.Element {
  const navigate = useNavigate();

  const handleSignIn = (): void => {
    console.debug("Handling user sign-in...");
    checkAuthenticated()
      .then((res) => {
        console.debug(
          res ? "User is authenticated." : "User is not authenticated.",
        );
        if (!res) {
          console.debug("User is not authenticated. Sending to index.");
        }
      })
      .catch((err) => {
        console.debug(err);
      });

    navigate("/login");
  };

  return (
    <Toolbar className={navbarStyles.toolBar}>
      <NavbarLogo />
      <NavbarTabs tabs={["Lobby", "Ladder", "Stats", "Faq"]} />
      <NavbarActions
        navbarActions={[
          <NavbarActionButton
            key={"signIn"}
            icon={<LoginIcon className={navbarStyles.navIcon} />}
            text={
              <Typography variant="button" className={appStyles.primaryFont}>
                Log In
              </Typography>
            }
            onClickFunc={handleSignIn}
          />,
          <NavbarActionButton
            key={"signup"}
            icon={<AppRegistrationIcon className={navbarStyles.navIcon} />}
            text={
              <Typography variant="button" className={appStyles.primaryFont}>
                Sign Up
              </Typography>
            }
            onClickFunc={() => {
              navigate("/signup");
            }}
          />,
        ]}
      />
    </Toolbar>
  );
}
