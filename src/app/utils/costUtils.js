export const translateCostType = (value) => {
  return COST_TYPES.find((s) => s.value === value).translation;
};

export const getCostTypes = () => COST_TYPES;

const COST_TYPES = [
  {
    value: "PEMA",
    translation: "PEMA",
  },
  {
    value: "TRANSPORT",
    translation: "TRANSPORTE",
  },
  {
    value: "PORT",
    translation: "G.PTO",
  },
  {
    value: "BILL",
    translation: "FACTURA"
  },
  {
    value: "OTHER",
    translation: "OTROS",
  },
  {
    value: "EXTRA",
    translation: "EXTRA",
  },
];
