/* eslint-disable @typescript-eslint/no-explicit-any */

export type genericObject = Record<
  string,
  number | string | string[] | boolean | undefined | null
>;

// User
export interface User extends genericObject {
  email: string;
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
