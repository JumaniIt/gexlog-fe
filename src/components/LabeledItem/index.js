import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const LabeledItem = ({ item, label }) => {
  return (
    <FormControl className="labeled-item" variant="floating">
      <div className="item">
        <FormLabel>{label}</FormLabel>
        {item}
      </div>
    </FormControl>
  );
};

export default LabeledItem;
