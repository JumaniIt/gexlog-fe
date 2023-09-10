import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { MdSearch, MdOutlineOpenInNew } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { search } from "../../app/services/orderService";

const FilterTable = () => {
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
  });
  const [searchResults, setSearchResults] = useState();

  const handleClick = async () => {
    try {
      // Llama a la función search con datos de prueba y espera a que se resuelva la promesa
      const data = await search(filters);
      console.log(data, "data");
      setSearchResults(data?.elements);
    } catch (error) {
      // Maneja errores si es necesario
      console.error("Error:", error);
    }
  };

  return (
    <div className="filter-table-container">
      <div className="filter-bar">
        <Select
          size="sm"
          placeholder="Cliente"
          onChange={(e) =>
            setFilters({ ...filters, client_id: e.target.value })
          }
        >
          <option value="4">Prueba 1</option>
          <option value="5">Prueba 2</option>
        </Select>
        <Input
          size="sm"
          placeholder="Legajo"
          onChange={(e) => setFilters({ ...filters, code: e.target.value })}
        />
        <input
          className="chakra-input css-1xt0hpo"
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, date_from: e.target.value })
          }
        />
        <input
          className="chakra-input css-1xt0hpo"
          type="date"
          onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
        />
        <Checkbox
          onChange={(e) => setFilters({ ...filters, pema: e.target.checked })}
        >
          PEMA
        </Checkbox>
        <Checkbox
          onChange={(e) => setFilters({ ...filters, port: e.target.checked })}
        >
          G. PTO
        </Checkbox>
        <Checkbox
          onChange={(e) =>
            setFilters({ ...filters, transport: e.target.checked })
          }
        >
          TTE
        </Checkbox>
        <Select
          size="sm"
          placeholder="Estado"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="DRAFT">Borrador</option>
          <option value="REVISION">Revisión</option>
          <option value="PROCESSING">Procesando</option>
          <option value="FINISHED">Finalizado</option>
        </Select>
        <Button size="sm" onClick={handleClick}>
          <MdSearch />
          Buscar
        </Button>
      </div>
      <div className="results-table">
        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Legajo</Th>
                <Th>Cliente</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>PEMA</Th>
                <Th>G. PTO</Th>
                <Th>TTE</Th>
                <Th>Origen</Th>
                <Th>Dest.</Th>
                <Th>Estado</Th>
                <Th>Ver</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchResults &&
                searchResults?.map((result) => {
                  return (
                    <Tr className="table-row">
                      <Td>{result.id}</Td>
                      <Td>{result.code}</Td>
                      <Td>{result.client_id}</Td>
                      <Td>{result.arrival_data?.arrival_date}</Td>
                      <Td>{result.arrival_data?.arrival_time}</Td>
                      <Td>
                        {result.pema ? (
                          <CheckIcon
                            color="green.500"
                            style={{ pointerEvents: "none" }}
                          />
                        ) : (
                          <CloseIcon
                            color="red.500"
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </Td>
                      <Td>
                        {result.port ? (
                          <CheckIcon
                            color="green.500"
                            style={{ pointerEvents: "none" }}
                          />
                        ) : (
                          <CloseIcon
                            color="red.500"
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </Td>
                      <Td>
                        {result.transport ? (
                          <CheckIcon
                            color="green.500"
                            style={{ pointerEvents: "none" }}
                          />
                        ) : (
                          <CloseIcon
                            color="red.500"
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </Td>
                      <Td>{result.arrival_data?.origin}</Td>
                      <Td>{result.arrival_data?.turn}</Td>
                      <Td>{result.status}</Td>
                      <Td>
                        <Link to={`./order/${result.id}`}>
                          <MdOutlineOpenInNew />
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FilterTable;
