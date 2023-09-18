import { getCookie } from "./cookieService";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const internalError = {
  status: 500,
  code: "internal_error",
  message: "Rest error",
};

const perform = async (method, uri, req, queryParams = {}) => {
  const url = new URL(BASE_URL + uri);
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key]
    if (value) {
      url.searchParams.append(key, value)
    }
  });

  const body = req ? JSON.stringify(req) : null;
  const jwtToken = getCookie('jwtTokenTemp')

  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        "x-auth-origin": "gexlog-fe",
        "Content-Type": "application/json",
        "x-auth-token": "Bearer " + jwtToken
      },
      body,
    });
    return response;
  } catch (error) {
    console.error("Rest error:", error);
    return internalError;
  }
};

export const post = async (uri, req) => {
  return perform("POST", uri, req);
};

export const get = async (uri, queryParams = {}) => {
  return perform("GET", uri, null, queryParams);
};

export const put = async (uri, req) => {
  console.log(uri)
  return perform("PUT", uri, req);
};

export const doDelete = async (uri, queryParams = {}) => {
  return perform("DELETE", uri, null, queryParams);
};
