const BASE_URL = process.env.REACT_APP_BASE_URL;

const internalError = {
  status: 500,
  code: "internal_error",
  message: "Rest error",
};

export const post = async (uri, req) => {
  try {
    const response = await fetch(BASE_URL + uri, {
      method: "POST",
      credentials: "include",
      headers: {
        "x-auth-origin": "gexlog-fe",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    return response;
  } catch (error) {
    console.error("Rest error:", error);
    return internalError;
  }
};

export const get = async (uri) => {
  try {
    const response = await fetch(BASE_URL + uri, {
      method: "GET",
      credentials: "include",
      headers: {
        "x-auth-origin": "gexlog-fe",
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Rest error:", error);
    return internalError;
  }
}
