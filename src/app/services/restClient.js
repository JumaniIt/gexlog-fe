import { SESSION_EXPIRED_ERROR } from "../utils/sessionUtils";
import { getCookie } from "./cookieService";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const error = (code, message, status) => {
  return {
    _isError: true,
    code,
    message,
    status,
  };
};

const internalError = error(
  "Error interno",
  "Intente de nuevo más tarde. Si el error persiste comuníquese con el administrador",
  500
);

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
  headers.append("x-auth-token", "Bearer " + 1);
  headers.append("x-auth-origin", "gexlog-fe");
  

  let body;
  if (contentType !== "multipart/form-data;") {
    headers.append("Content-Type", "application/json;");
    body = req ? toJsonBody(req) : null;
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

    const status = response.status;
    if (status === 401) {
      throw SESSION_EXPIRED_ERROR;
    } else if (response.status >= 400) {
      return toCustomError(await response.json(), status);
    } else if (status === 204) {
      return { _isError: false };
    } else {
      return await response.json();
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

const toJsonBody = (req) => {
  const filteredReq = {};

  for (const key in req) {
    if (!key.startsWith("_")) {
      filteredReq[key] = req[key];
    }
  }

  return JSON.stringify(filteredReq);
};

const toCustomError = (jsonError, status) => {
  let code;
  let message;

  if (status >= 500) {
    return internalError;
  } else if (jsonError.error) {
    code = jsonError.error.code;
    message = jsonError.causes.map((c) => c.code + " " + c.message).join(", ");
  } else if (jsonError.message) {
    code = jsonError.code;
    message = jsonError.message;
  } else {
    code = "Error desconocido";
    message =
      "Intente de nuevo más tarde. Si el error persiste comuníquese con el administrador";
  }

  return error(code, message, status);
};
