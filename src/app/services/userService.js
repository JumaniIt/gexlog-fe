import { getCookie } from "./cookieService";

export const getCurrentUser = () => {
  const currentUser = getCookie("currentUser");

  if (!currentUser) {
    throw new Error("session expired");
  }

  return JSON.parse(currentUser);
};
