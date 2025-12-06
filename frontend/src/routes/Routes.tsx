import React from "react";
import Faq from "../pages/faq/Faq";
import Landing from "../pages/landing/Landing";
import ExceptionPage from "../pages/exception/ExceptionPage";
import type { RoutePropsList } from "./RouteProps";
import Lobby from "../pages/lobby/Lobby";
import Ladder from "../pages/ladder/Ladder";
import Stats from "../pages/stats/Stats";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Match from "../pages/match/Match";

export function getRoutes(): RoutePropsList {
  return [
    // Public
    // TODO Sort into public/private
    { path: "/", private: false, element: <Landing /> },
    { path: "/lobby", private: false, element: <Lobby /> },
    { path: "/match", private: false, element: <Match /> },
    { path: "/ladder", private: false, element: <Ladder /> },
    { path: "/stats", private: false, element: <Stats /> },
    { path: "/faq", private: false, element: <Faq /> },
    { path: "/login", private: false, element: <Login /> },
    { path: "/signup", private: false, element: <SignUp /> },
    {
      path: "*",
      private: false,
      element: <ExceptionPage headerText="Page not found" />,
    },
  ];
}
