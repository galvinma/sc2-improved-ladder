import { Store } from ".././store/Store";
import type { User } from "../interfaces/interfaces";
import { getData, postData } from "./api";

export async function verifyToken(): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    console.debug("Checking if user token is still valid...");

    // TODO Add guard for empty or invalid token

    getData({
      endpoint: `verify_token`,
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

export const handleLogout = (): void => {
  console.debug("Handling user sign-out...");
  // TODO API call
  // TODO store cleanup

  window.location.replace("/login");
};

export async function handleLogin(
  email: string,
  password: string
): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    console.debug("Attempting to login user...");
    postData({
      endpoint: `login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        const user: User = {
          email: res.data.email,
          token: res.data.token,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
        };

        // TODO there is a race condition here on login. Token is not set before auth check after redirect
        Store.setState({ ...user });
        resolve(true);
      })
      .catch((err) => {
        console.debug(err);
        reject(new Error("API rejected login request."));
      });
  });
}

export async function handleRegistration(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    console.debug("Attempting to register new user...");
    postData({
      endpoint: `register`,
      data: {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      },
    })
      .then(() => {
        resolve(true);
        window.location.replace("/login");
      })
      .catch((err) => {
        console.debug(err);
        reject(new Error("API rejected register request."));
      });
  });
}
