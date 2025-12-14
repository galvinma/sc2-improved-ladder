import Box from "@mui/material/Box";
import navbarStyles from "./Navbar.module.scss";
import React, { type JSX } from "react";
import { Typography } from "@mui/material";
import LogoSVG from "../.././assets/svg/logo.svg";
import { useNavigate } from "react-router";
import appStyles from "../.././styles/App.module.scss";

export default function NavbarLogo(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box
      className={[navbarStyles.logoContainer, appStyles.cursorPointer].join(
        " "
      )}
      onClick={() => navigate("/")}
    >
      <img src={LogoSVG} className={navbarStyles.logo} />
      <Typography className={navbarStyles.logoText} variant="h1">
        IMPROVED LADDER
      </Typography>
    </Box>
  );
}
