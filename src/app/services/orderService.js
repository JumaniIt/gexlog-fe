import { get, post, put, doDelete } from "./restClient";

const BASE_PATH = "/orders";
const DOCUMENTS = "/documents";
const NOTES = "/notes";
const COSTS = "/costs";

export const create = async (order) => {
  const response = await post(BASE_PATH, order);
  return await response.json();
};

export const update = async (id, order) => {
  const response = await put(BASE_PATH + "/" + id, order);
  return await response.json();
};

export const search = async (filters) => {
  const response = await get(BASE_PATH, filters);
  return await response.json();
};

export const getById = async (id) => {
  const response = await get(BASE_PATH + "/" + id);
  return await response.json();
};

export const changeStatus = async (id, newStatus) => {
  const response = await put(BASE_PATH + "/" + id + "/status/" + newStatus);

  if (response.status !== 204) {
    return await response.json();
  }
};

export const markBilled = async (id, billed) => {
  const response = await post(BASE_PATH + "/" + id + "/billed/" + billed)
  
  if (response.status !== 204) {
    return await response.json();
  }
}

export const markReturned = async (id, returned) => {
  const response = await post(BASE_PATH + "/" + id + "/returned/" + returned)
  
  if (response.status !== 204) {
    return await response.json();
  }
}


// ---- DOCUMENTS ----
export const addDocument = async (orderId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await post(
    BASE_PATH + "/" + orderId + DOCUMENTS,
    formData,
    "multipart/form-data;"
  );

  return await response.json();
};

export const getDocumentLink = async (orderId, docId) => {
  const response = await get(
    BASE_PATH + "/" + orderId + DOCUMENTS + "/" + docId
  );
  const resJson = await response.json();

  return resJson.link;
};

export const deleteDocument = async (orderId, docId) => {
  const response = await doDelete(
    BASE_PATH + "/" + orderId + DOCUMENTS + "/" + docId
  );

  if (response.status !== 204) {
    return await response.json();
  }
};
// ---- END DOCUMENTS ----

// ---- NOTES ----
export const getNotes = async (orderId, filters) => {
  const response = await get(BASE_PATH + "/" + orderId + NOTES, filters);
  return await response.json();
} 

export const addNote = async (orderId, note) => {
  const response = await post(BASE_PATH + "/" + orderId + NOTES, note);
  return await response.json();
};

export const updateNote = async (orderId, noteId, note) => {
  const response = await put(BASE_PATH + "/" + orderId + NOTES + "/" + noteId, note);
  return await response.json();
};

export const deleteNote = async (orderId, noteId) => {
  const response = await doDelete(BASE_PATH + "/" + orderId + NOTES + "/" + noteId);

  if (response.status !== 204) {
    return await response.json();
  }
};
// ---- END NOTES ----

// ---- COSTS ----
export const getCosts = async (orderId, filters) => {
  const response = await get(BASE_PATH + "/" + orderId + COSTS, filters);
  return await response.json();
} 

export const addCost = async (orderId, cost) => {
  const response = await post(BASE_PATH + "/" + orderId + COSTS, cost);
  return await response.json();
};

export const updateCost = async (orderId, costId, cost) => {
  const response = await put(BASE_PATH + "/" + orderId + COSTS + "/" + costId, cost);
  return await response.json();
};

export const deleteCost = async (orderId, costId) => {
  const response = await doDelete(BASE_PATH + "/" + orderId + COSTS + "/" + costId);

  if (response.status !== 204) {
    return await response.json();
  }
};
// ---- END COSTS ----

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
