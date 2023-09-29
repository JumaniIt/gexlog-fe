import { get, post, put } from "./restClient";

const BASE_PATH = "/users";

export const search = async (filters) => await get(BASE_PATH, filters);

export const save = async (user) => await post(BASE_PATH, user);

export const update = async (id, user) => await put(BASE_PATH + "/" + id, user);

export const getById = async (id) => await get(BASE_PATH + "/" + id);
