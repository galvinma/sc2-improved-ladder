import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import navbarStyles from "./Navbar.module.scss";
import NavbarActionButton from "./NavbarActionButton";
import NavbarActions from "./NavbarActions";
import NavbarTabs from "./NavbarTabs";
import React, { type JSX } from "react";
import { useNavigate } from "react-router";
import appStyles from "../.././styles/App.module.scss";

import NavbarLogo from "./NavbarLogo";
import { Toolbar } from "@mui/material";

export default function ExternalNavbar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Toolbar className={navbarStyles.toolBar}>
      <NavbarLogo />
      <NavbarTabs tabs={["Faq"]} />
      <NavbarActions
        navbarActions={[
          <NavbarActionButton
            key={"login"}
            icon={<LoginIcon className={navbarStyles.navIcon} />}
            text={
              <Typography
                variant="button"
                className={[
                  navbarStyles.navTabBtnText,
                  appStyles.primaryFont,
                ].join(" ")}
              >
                Log In
              </Typography>
            }
            onClickFunc={() => navigate("/login")}
          />,
          <NavbarActionButton
            key={"register"}
            icon={<AppRegistrationIcon className={navbarStyles.navIcon} />}
            text={
              <Typography
                variant="button"
                className={[
                  navbarStyles.navTabBtnText,
                  appStyles.primaryFont,
                ].join(" ")}
              >
                Register
              </Typography>
            }
            onClickFunc={() => {
              navigate("/register");
            }}
          />,
        ]}
      />
    </Toolbar>
  );
}
