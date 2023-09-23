import { SESSION_EXPIRED_ERROR } from "../utils/sessionUtils";
import { getCookie } from "./cookieService";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const internalError = {
  status: 500,
  code: "internal_error",
  message: "Rest error",
};

const perform = async (
  method,
  uri,
  req,
  queryParams = {},
  contentType = "application/json"
) => {
  const url = new URL(BASE_URL + uri);
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  const jwtToken = getCookie("jwtTokenTemp");
  const headers = new Headers();
  headers.append("x-auth-origin", "gexlog-fe");
  headers.append("x-auth-token", "Bearer " + jwtToken);

  let body;
  if (contentType !== "multipart/form-data;") {
    headers.append("Content-Type", "application/json;");
    body = req ? JSON.stringify(req) : null;
  } else {
    body = req;
  }

  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers,
      body,
    });
    if (response.status === 401) {
      throw SESSION_EXPIRED_ERROR;
    } else {
      return response;
    }
  } catch (error) {
    if (error === SESSION_EXPIRED_ERROR) {
      throw error;
    }

    console.error("Rest error:", error);
    return internalError;
  }
};

export const post = async (uri, req, contentType) => {
  return perform("POST", uri, req, {}, contentType);
};

export const get = async (uri, queryParams = {}) => {
  return perform("GET", uri, undefined, queryParams);
};

export const put = async (uri, req) => {
  return perform("PUT", uri, req);
};

export const doDelete = async (uri, queryParams = {}) => {
  return perform("DELETE", uri, null, queryParams);
};
