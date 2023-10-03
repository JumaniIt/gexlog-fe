import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const LabeledItem = ({ item, label }) => {
  return (
    <FormControl className="labeled-item" variant="floating">
      <FormLabel>{label}</FormLabel>
      <div className="item">{item}</div>
    </FormControl>
  );
};

export default LabeledItem;
