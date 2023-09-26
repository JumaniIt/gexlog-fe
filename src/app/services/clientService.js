import { get, post, put } from "./restClient";

const BASE_PATH = "/clients";

export const search = async (filters) => {
  const response = await get(BASE_PATH, filters);
  return await response.json();
};

export const getById = async (id, withConsignees = "false") => {
  const response = await get(BASE_PATH + "/" + id, {
    with_consignees: withConsignees,
  });
  return await response.json();
};

export const save = async (client) => {
  const response = await post(BASE_PATH, client);
  return await response.json();
};

export const update = async (id, client) => {
  const response = await put(BASE_PATH + "/" + id, client);
  return await response.json();
};

export const addConsignee = async (id, consignee) => {
  const response = await post(BASE_PATH + "/" + id + "/consignees", consignee);
  return await response.json();
};

export const getOneByUserId = async (user_id) => {
  const response = await search({user_id:user_id, page_size:1, with_consignees:"true"})

  if (response?.elements) {
    return response.elements[0]
  }
}
