import { get, post, put } from "./restClient";

const BASE_PATH = "/orders";

/*
Example usage
    const orders = await search(
      "PRUEBA",
      false,
      true,
      false,
      "2023-11-23",
      "2023-11-23",
      "20:08:46",
      "20:08:47",
      4,
      "FINISHED",
      1,
      1
    );

    console.log(orders);
*/

export const search = async (filters) => {
  const response = await get(BASE_PATH, filters);
  return await response.json();
};

export const getById = async id => {
  const response = await get(BASE_PATH + "/" + id);
  return await response.json();
}
