import { type User } from ".././interfaces/interfaces";
import { Store } from ".././store/Store";

export const developmentUser: User = {
  userId: "123",
  userName: "sc2-improved-ladder-user-name",
  email: "sc2-improved-ladder-user@sc2.com",
  firstName: "First",
  lastName: "Last",
};

export const getCurrentUser = (): User => {
  const user: User = {
    userId: Store.getState().userId,
    userName: Store.getState().userName,
    email: Store.getState().email,
    firstName: Store.getState().firstName,
    lastName: Store.getState().lastName,
  };

  return user;
};
