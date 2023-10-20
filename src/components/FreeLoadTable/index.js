import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ExpandButton,
} from "@chakra-ui/react";
import { formatDestinations } from "../../app/utils/destinationUtils";

const FreeLoadTable = ({ freeLoads }) => {
  return (
    <TableContainer>
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Patente</Th>
            <Th>Tipo</Th>
            <Th>Guía</Th>
            <Th>Destinación</Th>
            <Th>Peso</Th>
          </Tr>
        </Thead>
        <Tbody>
          {freeLoads?.map((fl, index) => {
            return (
              <Tr>
                <Td>{fl.patent}</Td>
                <Td>{fl.type}</Td>
                <Td>{fl.guide}</Td>
                <Td>{formatDestinations(fl.destinations)}</Td>
                <Td>{fl.weight}</Td>
                {/*                 <Td>
                  <ExpandButton
                    isDisabled={readOnly}
                    onEdit={() => {
                      setSelectedContainerIndex(index);
                      setOpenContainerModal(true);
                    }}
                    onDelete={() => deleteContainer(index)}
                  />
                </Td> */}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FreeLoadTable;
