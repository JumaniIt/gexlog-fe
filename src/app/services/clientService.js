import { get, post, put } from "./restClient";

const BASE_PATH = "/clients";

export const search = async (filters) => await get(BASE_PATH, filters);

export const getById = async (id, withConsignees = "false") =>
  await get(BASE_PATH + "/" + id, {
    with_consignees: withConsignees,
  });

export const save = async (client) => await post(BASE_PATH, client);

export const update = async (id, client) =>
  await put(BASE_PATH + "/" + id, client);

export const addConsignee = async (id, consignee) =>
  await post(BASE_PATH + "/" + id + "/consignees", consignee);

export const getOneByUserId = async (user_id) => {
  const response = await search({
    user_id: user_id,
    page_size: 1,
    with_consignees: "true",
  });

  if (response._isError) {
    return response;
  }

  if (response?.elements.length) {
    return response.elements[0];
  } else {
    return {
      _isError: true,
      code: "not_found",
      message: "client with user_id " + user_id + " not found",
    };
  }
};
