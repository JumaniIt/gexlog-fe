<<<<<<< HEAD
import { removeCookie, setCookie } from "./cookieService";
import { post } from "./restClient";

export const login = async (email, password) => {
  removeCookie("jwtToken");

  const req = {
    email,
    password,
  };

  const response = await post("/login", req);
  const resJson = await response.json();

  if (response.status === 200) {
    setCookie("jwtToken", resJson.token, {});

    return {
      user: resJson.user,
    };
  } else if (response.status === 400) {
    return {
      message: "Email o contraseña incorrectos",
    };
  } else {
    return {
      message:
        "Error interno, por favor intente más tarde o contacte al administrador",
    };
=======
import { post } from "./restClient"

export const login = async (email, password) => {
  const req = {
    email,
    password
  };

  // const response = await post("/login", req);
  // const resJson = await response.json();

  // if (response.status === 200) {
  //   console.log("the token " + resJson.token)
  //   return {
  //     user: resJson.user
  //   }
  // } else if (response.status === 400) {
  //   return {
  //     message: "Email o contraseña incorrectos"
  //   }
  // } else {
  //   return {
  //     message: "Error interno, por favor intente más tarde o contacte al administrador"
  //   }
  // }

  return {
    user: 'mili',
    id: 12
>>>>>>> login
  }
};
