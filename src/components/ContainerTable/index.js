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

const ContainerTable = ({ containers }) => {
  return (
    <TableContainer>
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Contenedor</Th>
            <Th>Tipo</Th>
            <Th>BL</Th>
            <Th>Destinación</Th>
            <Th>Reenvase</Th>
          </Tr>
        </Thead>
        <Tbody>
          {containers?.map((container, index) => {
            return (
              <Tr>
                <Td>{container.code}</Td>
                <Td>{container.type}</Td>
                <Td>{container.bl}</Td>
                <Td>{formatDestinations(container.destinations)}</Td>
                <Td>{container.repackage ? "SI" : "NO"}</Td>
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

export default ContainerTable;
