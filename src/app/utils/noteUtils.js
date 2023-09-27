export const translateAuthor = (value) => {
  return AUTHORS.find((s) => s.value === value).translation;
};

export const CLIENT = "CLIENT";
export const ADMIN = "ADMIN";

const AUTHORS = [
  {
    value: "SYSTEM",
    translation: "Sistema",
  },
  {
    value: ADMIN,
    translation: "Administrador",
  },
  {
    value: CLIENT,
    translation: "Cliente",
  },
];
