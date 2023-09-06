import { getCookie } from "./cookieService";

export const getCurrentUser = (async) => {
  const currentUser = getCookie("currentUser");

  if (currentUser === undefined) {
    throw new Error("session expired");
  }

  return JSON.parse(currentUser);
};
