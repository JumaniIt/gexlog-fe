import { get, post, put } from "./restClient";

const BASE_PATH = "/clients";

export const search = async (filters) => {
  const response = await get(BASE_PATH, filters);
  return await response.json();
};

export const getById = async id => {
  const response = await get(BASE_PATH + "/" + id);
  return await response.json();
}
