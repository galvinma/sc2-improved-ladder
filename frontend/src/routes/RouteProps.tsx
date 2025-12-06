import type { JSX } from "react";

export interface RouteProps {
  path: string;
  private: boolean;
  element: JSX.Element;
}

export type RoutePropsList = RouteProps[];
