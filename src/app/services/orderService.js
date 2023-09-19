import { get, post, put, doDelete } from "./restClient";

const BASE_PATH = "/orders";

const DOCUMENTS = "/documents";

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

export const getById = async (id) => {
  const response = await get(BASE_PATH + "/" + id);
  return await response.json();
};

export const getDocumentLink = async (orderId, docId) => {
  const response = await get(BASE_PATH + "/" + orderId + DOCUMENTS + "/" + docId);
  const resJson = await response.json();

  return resJson.link;
};

export const deleteDocument = async (orderId, docId) => {
  await doDelete(BASE_PATH + "/" + orderId + DOCUMENTS + "/" + docId);
  return;
};

export const addDocument = async (orderId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await post(
    BASE_PATH + "/" + orderId + DOCUMENTS,
    formData,
    "multipart/form-data;"
  );
  console.log(JSON.stringify(response))
  return response.json();
};

export const statuses = [
  {
    value: "DRAFT",
    translation: "BORRADOR",
  },
  {
    value: "REVISION",
    translation: "REVISION",
  },
  {
    value: "PROCESSING",
    translation: "PROCESANDO",
  },
  {
    value: "FINISHED",
    translation: "FINALIZADO",
  },
  {
    value: "CANCELLED",
    translation: "CANCELADO",
  },
];
