// eslint-disable-next-line @typescript-eslint/no-explicit-any

import type { JSX } from "react";

export type genericObject = Record<
  string,
  number | string | string[] | boolean | undefined | null
>;

// User
export interface User extends genericObject {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

export interface requestArgs {
  endpoint: string;
  data?: any;
  query?: any;
  projection?: any;
  params?: any;
}
