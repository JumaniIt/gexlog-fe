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
import { DeleteIcon } from "@chakra-ui/icons";
import {
  PRIV,
  TRM,
  getDestinationTypes,
} from "../../app/utils/destinationUtils";
import { getCurrencies } from "../../app/utils/currencyUtils";

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
                placeholder="-"
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
                  disabled={d.type === PRIV}
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
              <Select
                size="sm"
                name="currency"
                value={d.currency}
                onChange={(e) => onDestinationChange(e, index)}
                placeholder="-"
              >
                {getCurrencies().map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
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
