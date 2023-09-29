import { Td, Text, Tooltip } from "@chakra-ui/react";

const TableCellWithTooltip = ({ text, tooltipText }) => {
  return (
    <Td>
      <Tooltip label={tooltipText}>
        <Text>{text}</Text>
      </Tooltip>
    </Td>
  );
};

export default TableCellWithTooltip;
