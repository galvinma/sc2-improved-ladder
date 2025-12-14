import type { JSX } from "react";

export interface RouteProps {
  path: string;
  privateRoute: boolean;
  element: JSX.Element;
}

export type RoutePropsList = RouteProps[];
