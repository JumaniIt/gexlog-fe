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
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { TRM, getDestinationTypes } from "../../app/utils/destinationUtils";

const DestinationTable = ({
  destinations,
  onDestinationChange,
  onDeleteDestination,
}) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Tipo</Th>
          <Th>Código</Th>
          <Th>FOB</Th>
          <Th>Divisa</Th>
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
              <Tooltip
                label={d._isInvalid && "El código debe contener 16 caracteres"}
              >
                <Input
                  isInvalid={d._isInvalid}
                  size="sm"
                  name="code"
                  value={d.code}
                  onChange={(e) => onDestinationChange(e, index)}
                />
              </Tooltip>
            </Td>
            <Td>
              <Input
                size="sm"
                name="fob"
                value={d.fob}
                disabled={d.type !== TRM}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <Input
                size="sm"
                name="currency"
                value={d.currency}
                disabled={d.type !== TRM}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <Input
                size="sm"
                name="product_details"
                value={d.product_details}
                disabled={d.type !== TRM}
                onChange={(e) => onDestinationChange(e, index)}
              />
            </Td>
            <Td>
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                onClick={() => onDeleteDestination(index)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DestinationTable;
