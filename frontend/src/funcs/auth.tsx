import { Store } from ".././store/Store";
import { developmentUser } from "./user";

export async function checkAuthenticated(): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    // Short circuit if in development
    if (process.env.NODE_ENV === "development") {
      console.debug("Skipping auth check because NODE_ENV is development.");
      Store.setState({ ...developmentUser });
      resolve(true);
      return;
    } else {
      reject(false);
    }
  });
}
export async function verifyToken(): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    // Short circuit if in development
    if (process.env.NODE_ENV === "development") {
      console.debug("Skipping token check because NODE_ENV is development.");
      resolve(true);
      return;
    } else {
      reject(false);
    }
  });
}

export const handleSignOut = (): void => {
  console.debug("Handling user sign-out...");
  window.location.replace("/");
};
