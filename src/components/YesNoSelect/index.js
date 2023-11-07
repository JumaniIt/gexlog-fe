import React from "react";
import { Select } from "@chakra-ui/react";

const YesNoSelect = ({ value, onChange }) => {
  return (
    <Select size="sm" onChange={onChange} placeholder="-" value={value || "-"}>
      <option key={"true"} value={true}>
        Si
      </option>
      <option key={"false"} value={false}>
        No
      </option>
    </Select>
  );
};

export default YesNoSelect;
