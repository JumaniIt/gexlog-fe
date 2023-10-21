import { get, post, put, doDelete } from "./restClient";

const BASE_PATH = "/orders";
const DOCUMENTS = "/documents";
const NOTES = "/notes";
const COSTS = "/costs";

export const create = async (order) => await post(BASE_PATH, order);

export const update = async (id, order) =>
  await put(BASE_PATH + "/" + id, order);

export const search = async (filters) => await get(BASE_PATH, filters);

export const getById = async (id) => await get(BASE_PATH + "/" + id);

export const changeStatus = async (id, newStatus) =>
  await put(BASE_PATH + "/" + id + "/status/" + newStatus);

export const markBilled = async (id, billed) =>
  await post(BASE_PATH + "/" + id + "/billed/" + billed);

export const markReturned = async (id, returned) =>
  await post(BASE_PATH + "/" + id + "/returned/" + returned);

// ---- DOCUMENTS ----
export const addDocument = async (orderId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await post(
    BASE_PATH + "/" + orderId + DOCUMENTS,
    formData,
    "multipart/form-data;"
  );
};

export const getDocumentLink = async (orderId, docId) =>
  await get(BASE_PATH + "/" + orderId + DOCUMENTS + "/" + docId);

export const deleteDocument = async (orderId, docId) =>
  await doDelete(BASE_PATH + "/" + orderId + DOCUMENTS + "/" + docId);

// ---- END DOCUMENTS ----

// ---- NOTES ----
export const getNotes = async (orderId, filters) =>
  await get(BASE_PATH + "/" + orderId + NOTES, filters);

export const addNote = async (orderId, note) =>
  await post(BASE_PATH + "/" + orderId + NOTES, note);

export const updateNote = async (orderId, noteId, note) =>
  await put(BASE_PATH + "/" + orderId + NOTES + "/" + noteId, note);

export const deleteNote = async (orderId, noteId) =>
  await doDelete(BASE_PATH + "/" + orderId + NOTES + "/" + noteId);

// ---- END NOTES ----

// ---- COSTS ----
export const getCosts = async (orderId, filters) =>
  await get(BASE_PATH + "/" + orderId + COSTS, filters);

export const addCost = async (orderId, cost) =>
  await post(BASE_PATH + "/" + orderId + COSTS, cost);

export const updateCost = async (orderId, costId, cost) =>
  await put(BASE_PATH + "/" + orderId + COSTS + "/" + costId, cost);

export const deleteCost = async (orderId, costId) =>
  await doDelete(BASE_PATH + "/" + orderId + COSTS + "/" + costId);

export const generateReport = async (request) => 
  await post(BASE_PATH + "/generate-report", request)


// ---- END COSTS ----

export const statuses = [
  {
    value: "DRAFT",
    translation: "BORRADOR",
    min: "BOR",
    colorScheme: "gray"
  },
  {
    value: "REVISION",
    translation: "ENVIADO",
    min: "REV",
    colorScheme: "orange"
  },
  {
    value: "PROCESSING",
    translation: "CONFIRMADO",
    min: "CNF",
    colorScheme: "blue"
  },
  {
    value: "FINISHED",
    translation: "FINALIZADO",
    min: "FIN",
    colorScheme: "green"
  },
  {
    value: "CANCELLED",
    translation: "CANCELADO",
    min: "CAN",
    colorScheme: "red"
  },
];
