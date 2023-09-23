import { getCookie } from "../services/cookieService";

export const SESSION_EXPIRED_ERROR = new Error("session expired");

export const withinSessionContext = async (
  navigate,
  action,
  onSuccess,
  onError,
  onFinally = () => {}
) => {
  try {
    const result = await action();
    return onSuccess(result);
  } catch (error) {
    console.log("the error: " + error);
    if (error === SESSION_EXPIRED_ERROR) {
      console.log("session expired error!!");
      navigateToLogin(navigate);
    } else {
      onError(error);
    }
  } finally {
    onFinally();
  }
};

export const getCurrentUser = (navigate) => {
  const currentUser = getCookie("currentUser");

  if (!currentUser) {
    navigateToLogin(navigate);
  } else {
    return JSON.parse(currentUser);
  }
};

const navigateToLogin = (navigate) => {
  navigate("/login", { replace: true });
};
