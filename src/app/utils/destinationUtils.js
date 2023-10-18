export const formatDestinations = (destinations) => {
  const formattedList = destinations.map((d) => `${d.code}`).join(", ");
  return formattedList;
};

export const toString = (destination) => {
  const type = destination.type || "(sin tipo)"
  let toString = type  + " - " + destination.code;
  if (destination.fob) {
    toString += " - " + destination.fob + " - " + destination.currency;
  }

  return toString;
};

export const getDestinationTypes = () => destinationTypes;

export const TRM = "TRM";

const destinationTypes = ["TLAT", TRM, "TLEA"];
