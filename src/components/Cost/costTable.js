import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { TRM, getDestinationTypes } from "../../app/utils/destinationUtils";

const CostTable = ({
  costs
}) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Fecha</Th>
          <Th>Tipo</Th>
          <Th>Descripción</Th>
          <Th>Monto</Th>
          <Th>Det. mercancía</Th>
        </Tr>
      </Thead>
      <Tbody>
        {destinations.map((d, index) => (
          <Tr key={d.id}>
            <Td>
              <Select
                size="sm"
                name="type"
                value={d.type}
                onChange={(e) => onDestinationChange(e, index)}
              >
                {getDestinationTypes().map((dt) => (
                  <option key={dt} value={dt}>
                    {dt}
                  </option>
                ))}
              </Select>
            </Td>
            <Td>
              <Input
                size="sm"
                name="code"
                value={d.code}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <Input
                size="sm"
                name="fob"
                value={d.fob}
                disabled={d.type && d.type !== TRM}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <Input
                size="sm"
                name="currency"
                value={d.currency}
                disabled={d.type && d.type !== TRM}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <Input
                size="sm"
                name="product_details"
                value={d.product_details}
                disabled={d.type && d.type !== TRM}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <IconButton icon={<EditIcon />} size="sm" colorScheme="red" />
              <IconButton icon={<DeleteIcon />} size="sm" colorScheme="red" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CostTable;
