import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import { MdSearch, MdOutlineOpenInNew } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  search as searchOrders,
  statuses,
} from "../../app/services/orderService";
import { search as searchClients } from "../../app/services/clientService";
import { getNameAndCuit } from "../../app/utils/clientUtils";
import { trimToMinutes } from "../../app/utils/dateUtils";
import { translateStatus } from "../../app/utils/orderUtils";
import PaginationFooter from "../Pagination/paginationFooter";
import { getCurrentUser } from "../../app/services/userService";

const OrderTable = () => {
  const [filters, setFilters] = useState({
    page_size: 10,
    page: 1,
  });
  const [paginationResult, setPaginationResult] = useState();
  const [searchResults, setSearchResults] = useState();
  const [clientOptions, setClientOptions] = useState([]);
  const [clientSelectionDisabled, setClientSelectionDisabled] = useState(false);
  const [clientSelectionPlaceHolder, setClientSelectionPlaceHolder] =
    useState();
  const [loading, setLoading] = useState(false);
  const [currentSearchFilters, setCurrentSearchFilters] = useState({});

  const handleClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const search = async (f) => {
    try {
      setLoading(true);
      // Llama a la función search con datos de prueba y espera a que se resuelva la promesa
      const data = await searchOrders(f);
      setSearchResults(data?.elements);
      setPaginationResult({
        totalPages: data.total_pages,
        page: data.page,
      });
    } catch (error) {
      // Maneja errores si es necesario
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchClientOptionsData = async () => {
      try {
        const options = await searchClients({ page_size: 100 });
        const clients = options.elements;
        setClientOptions(clients);
        const currentUser = getCurrentUser();
        if (!currentUser.admin) {
          setClientSelectionDisabled(true);
          const client = clients.length > 0 ? clients[0] : null;
          if (client) {
            setClientSelectionPlaceHolder(getNameAndCuit(client));
            setFilters({ ...filters, client_id: client.id });
          }
        }
      } catch (error) {
        console.error("Error fetching client options:", error);
      }
    };

    fetchClientOptionsData();
  }, []);

  return (
    <div className="filter-table-container">
      <div className="filter-bar">
        <Select
          size="sm"
          placeholder={clientSelectionPlaceHolder || "Cliente"}
          isDisabled={clientSelectionDisabled}
          onChange={(e) =>
            setFilters({ ...filters, client_id: e.target.value })
          }
        >
          {clientOptions.map((client) => (
            <option key={client.id} value={client.id}>
              {getNameAndCuit(client)}
            </option>
          ))}
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
        {/*         <div className="filter-dropdown">
          <Text>PEMA</Text>
          <Select
            size="sm"
            value={filters.pema}
            onChange={(e) => setFilters({ ...filters, pema: e.target.value })}
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
            <option value={undefined}>-</option>
          </Select>
        </div> */}
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
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.translation}
            </option>
          ))}
        </Select>
        <Button size="sm" onClick={handleClick}>
          <MdSearch />
          Buscar
        </Button>
      </div>
      {loading ? (
        // Render the spinner component (replace with your spinner component)
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20vh",
          }}
        >
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </div>
      ) : (
        <div>
          <div className="results-table">
            <TableContainer>
              <Table variant="striped" size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Cliente</Th>
                    <Th>Fecha</Th>
                    <Th>Hora</Th>
                    <Th>Origen</Th>
                    <Th>Destino</Th>
                    <Th>CTR</Th>
                    <Th>Dev</Th>
                    <Th>FC</Th>
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
                          <Td>
                            {getNameAndCuit(
                              clientOptions.find(
                                (c) => c.id === result.client_id
                              )
                            )}
                          </Td>
                          <Td>{result.arrival_date}</Td>
                          <Td>
                            {result.arrival_time &&
                              trimToMinutes(result.arrival_time)}
                          </Td>
                          <Td>{result.origin}</Td>
                          <Td>{result.target}</Td>
                          <Td>
                            {result.free_load ? (
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
                            {result.returned ? (
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
                            {result.billed ? (
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
                          <Td>{translateStatus(result.status)}</Td>
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
          {paginationResult && (
            <PaginationFooter
              currentPage={paginationResult.page}
              totalPages={paginationResult.totalPages}
              onPageChange={(newPage) => {
                const filters = { ...currentSearchFilters, page: newPage };
                search(filters);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTable;
