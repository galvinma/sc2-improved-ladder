import Box from "@mui/material/Box";
import React, { useEffect, useState, type JSX } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { setDocumentTitle } from "../funcs/browser";
import { verifyToken } from "../funcs/auth";
import Loading from "../pages/loading/Loading";
import { pageWrapper } from "../styles/InlineStyles";

interface layoutProps {
  privateRoute: boolean;
}

export default function Layout(props: layoutProps): JSX.Element {
  const location = useLocation();
  const [appState, setAppState] = useState({
    loaded: false,
    authenticated: false,
  });

  useEffect(() => {
    console.log(
      `Pathname=${location.pathname}. Private?=${props.privateRoute}`
    );
    setDocumentTitle();
    verifyToken()
      .then(() => {
        setAppState({
          loaded: true,
          authenticated: true,
        });
      })
      .catch(() => {
        setAppState({
          loaded: true,
          authenticated: false,
        });
      });
  }, [location, props.privateRoute]);

  const renderContent = (): JSX.Element => {
    if (appState.loaded) {
      if (props.privateRoute === true && appState.authenticated === false) {
        return (
          <Box style={{ ...pageWrapper }}>
            <Navigate to="/login" />;
          </Box>
        );
      } else {
        return <Outlet />;
      }
    } else {
      return <Loading />;
    }
  };

  return (
    <Box>
      <Navbar authenticated={appState.authenticated} />
      {renderContent()}
      <Footer />
    </Box>
  );
}
