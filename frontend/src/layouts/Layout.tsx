import ".././styles/App.module.scss";

import Box from "@mui/material/Box";

import React, { useEffect, type JSX } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { setDocumentTitle } from "../funcs/browser";
import { checkAuthenticated } from "../funcs/auth";

interface LayoutProps {
  private: boolean;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const [authenticated, setAuthenticated] = React.useState(false);

  useEffect(() => {
    setDocumentTitle();
    checkAuthenticated()
      .then(() => {
        console.debug("User passed auth check. Will render private content.");
        setAuthenticated(true);
      })
      .catch((err) => {
        console.debug(err);
        if (props.private) {
          const redirectUrl = "login";
          console.debug(
            `User failed auth check for private route. Will redirect to ${redirectUrl}.`,
          );
          window.location.replace(redirectUrl);
        }
      });
  }, [props]);

  return (
    <Box>
      <Box>
        <Navbar authenticated={authenticated} />
        {(authenticated && props.private) || !props.private ? (
          <Outlet />
        ) : (
          <Box>{"Loading..."}</Box>
        )}
        <Footer />
      </Box>
    </Box>
  );
}
