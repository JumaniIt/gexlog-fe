import { setCookie } from "./cookieService";
import { post } from "./restClient";

export const login = async (email, password) => {
  const req = {
    email,
    password,
  };

  const resJson = await post("/login", req);
  if (!resJson._isError) {
    // const inTwoHours = new Date(new Date().getTime() + 1 * 60 * 1000); // this is a minute
    const inTwoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

    // setCookie("jwtTokenTemp", resJson.token, { expires: inTwoHours });
    setCookie("currentUser", JSON.stringify(resJson.user), {
      expires: inTwoHours,
    });

    return;
  } else if (resJson.status >= 400 && resJson.status < 500) {
    return {
      message: "Email o contraseña incorrectos",
    };
  } else {
    return resJson;
  }
};
