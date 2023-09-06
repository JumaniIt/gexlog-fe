import { post } from "./restClient";

export const sendEmail = async (subject, body) => {
  const req = {
    subject,
    body,
  };

  const response = await post("/internal/send-email", req);
  if (response.status !== 204) {
    console.log("the error data")
    const errorData = await response.json();
    if (response.status === 400) {
      console.error("Client side error:", errorData);
    } else {
      console.log("Server side error:", errorData);
    }

    return errorData;
  }
};
