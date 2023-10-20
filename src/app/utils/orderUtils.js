import { statuses } from "../services/orderService";

export const translateStatus = (status) => {
  return getEnhancedStatus(status).translation;
};

export const getEnhancedStatus = (status) => {
  return statuses.find((s) => s.value === status);
};

export const DRAFT = "DRAFT";
export const REVISION = "REVISION";
export const PROCESSING = "PROCESSING";
export const FINISHED = "FINISHED";
export const CANCELLED = "CANCELLED";
