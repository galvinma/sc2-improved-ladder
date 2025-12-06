export type genericObject = Record<
  string,
  number | string | string[] | boolean | undefined | null
>;

// User
export interface User extends genericObject {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
}
