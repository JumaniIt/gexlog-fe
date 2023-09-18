import { setCookie } from "./cookieService";
import { post } from "./restClient";


export const login = async (email, password) => {
  const req = {
    email,
    password,
  };

  const response = await post("/login", req);
  const resJson = await response?.json();

  if (response.status === 200 && resJson) {
    // const inTwoHours = new Date(new Date().getTime() + 1 * 60 * 1000); // this is a minute
    const inTwoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

    setCookie("jwtTokenTemp", resJson.token, { expires: inTwoHours });
    setCookie("currentUser", JSON.stringify(resJson.user), {
      expires: inTwoHours,
    });

    return;
  } else if (response.status === 400) {
    return {
      message: "Email o contraseña incorrectos",
    };
  } else {
    return {
      message:
        "Error interno, por favor intente más tarde o contacte al administrador",
    };
  }
};
