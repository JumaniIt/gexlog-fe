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

export const search = async (
  code,
  pema,
  port,
  transport,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  clientId,
  status,
  pageSize,
  page
) => {
  const queryParams = {
    code: code,
    pema: pema,
    port: port,
    transport: transport,
    date_from: dateFrom,
    date_to: dateTo,
    time_from: timeFrom,
    time_to: timeTo,
    client_id: clientId,
    status: status,
    page_size: pageSize,
    page: page,
  };

  const response = await get(BASE_PATH, queryParams);
  return await response.json();
};

export const getById = async id => {
  const response = await get(BASE_PATH + "/" + id);
  return await response.json();
}
