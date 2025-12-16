/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { requestArgs } from "../interfaces/interfaces";

export const getData = async ({
  endpoint,
}: requestArgs): Promise<AxiosResponse> => {
  const headers = constructHeaders();

  return await new Promise((resolve, reject) => {
    const url = constructURL({
      endpoint,
    });
    console.debug(`Sending GET request to ${url}`);
    axios
      .get(url, headers)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const postData = async ({
  endpoint,
  data,
}: requestArgs): Promise<AxiosResponse> => {
  return await new Promise((resolve, reject) => {
    const url = constructURL({
      endpoint,
    });
    console.debug(`Sending POST request to ${url}`);
    axios
      .post(url, data, constructHeaders())
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

export const putData = async ({
  endpoint,
  data,
}: requestArgs): Promise<AxiosResponse> => {
  return await new Promise((resolve, reject) => {
    const url = constructURL({
      endpoint,
    });
    console.debug(`Sending PUT request to ${url}`);
    axios
      .put(url, data, constructHeaders())
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
};

const constructURL = ({ endpoint }: requestArgs): string => {
  return (
    `${import.meta.env.VITE_SC2_IMPROVED_LADDER_API_URL as string}` +
    "/" +
    endpoint
  );
};

const constructHeaders = (): any => {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("sc2il-token"),
      "Content-Type": "application/json",
    },
  };
};
