import { WARNING } from "./alertUtils";

export const getNameAndCuit = (client) => {
  const cuit = client?.cuit || "(sin cuit)";
  return `${client?.name} - ${cuit}`;
};

export const getCuitAndName = (client) => {
  const cuit = client?.cuit || "(sin cuit)";
  return `${cuit} - ${client?.name}`;
};

export const userWithoutClientAlert = {
  status: WARNING,
  code: "Datos de cliente incompletos",
  message: "Por favor contáctese con administración para completar su perfil",
};
