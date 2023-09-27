export const formatDestinations = (destinations) => {
  const formattedList = destinations.map((d) => `${d.code}`).join(", ");
  return formattedList;
};

export const getDestinationTypes = () => destinationTypes;

export const TRM = "TRM";

const destinationTypes = ["TLAT", TRM, "TLEA"];
