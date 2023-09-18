import { getCookie } from "./cookieService";
import { get, post, put } from "./restClient";

const BASE_PATH = "/users";

export const getCurrentUser = () => {
  const currentUser = getCookie("currentUser");

  if (!currentUser) {
    throw new Error("session expired");
  }

  return JSON.parse(currentUser);
};

export const search = async (filters) => {
  const response = await get(BASE_PATH, filters);
  return await response.json();
};

export const save = async (user) => {
  const response = await post(BASE_PATH, user);
  return await response.json();
};

export const update = async (id, user) => {
  const response = await put(BASE_PATH + "/" + id, user);
  return await response.json();
};

export const getById = async (id) => {
  const response = await get(BASE_PATH + "/" + id);
  return await response.json();
};
