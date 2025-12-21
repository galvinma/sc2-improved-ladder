import React from "react";
import Faq from "../pages/faq/Faq";
import Landing from "../pages/landing/Landing";
import ExceptionPage from "../pages/exception/ExceptionPage";
import type { RoutePropsList } from "./RouteProps";
import Lobby from "../pages/lobby/Lobby";
import Versus from "../pages/versus/Versus";
import Stats from "../pages/stats/Stats";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Match from "../pages/match/Match";
import History from "../pages/history/History";
import Settings from "../pages/settings/Settings";

export function getRoutes(): RoutePropsList {
  return [
    // Public
    { path: "/", privateRoute: false, element: <Landing /> },
    { path: "/stats", privateRoute: false, element: <Stats /> },
    { path: "/faq", privateRoute: false, element: <Faq /> },
    { path: "/login", privateRoute: false, element: <Login /> },
    { path: "/register", privateRoute: false, element: <Register /> },
    // Private
    { path: "/lobby", privateRoute: true, element: <Lobby /> },
    { path: "/versus", privateRoute: true, element: <Versus /> },
    { path: "/match/:id", privateRoute: true, element: <Match /> },

    { path: "/history", privateRoute: true, element: <History /> },
    { path: "/settings", privateRoute: true, element: <Settings /> },
    // Not Found
    {
      path: "*",
      privateRoute: false,
      element: <ExceptionPage headerText="Page not found" />,
    },
  ];
}
