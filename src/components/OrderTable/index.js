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
import { MdSearch, MdOutlineOpenInNew, MdCreate } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  search as searchOrders,
  statuses,
} from "../../app/services/orderService";
import { search as searchClients } from "../../app/services/clientService";
import { getNameAndCuit } from "../../app/utils/clientUtils";
import { trimToMinutes } from "../../app/utils/dateUtils";
import { translateStatus } from "../../app/utils/orderUtils";
import PaginationFooter from "../Pagination/paginationFooter";
import { withSession, getCurrentUser } from "../../app/utils/sessionUtils";
import { ERROR } from "../../app/utils/alertUtils";

const OrderTable = ({showAlert}) => {
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

  const navigate = useNavigate();

  const search = async (f) => {
    setLoading(true);
    withSession(
      navigate,
      async () => {
        const result = await searchOrders(f)
        if (result.message) {
          showAlert(ERROR, result.code, result.message)
        } else {
          setSearchResults(result?.elements);
          setPaginationResult({
            totalPages: result.total_pages,
            page: result.page,
          });
        }
      },
      (error) => console.log(error),
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchClientOptionsData = async () => {
      withSession(
        navigate,
        async () => {
          const result = await searchClients({ page_size: 100 });
          const clients = result.elements;
          setClientOptions(clients);
          const currentUser = getCurrentUser(navigate);
          if (!currentUser?.admin) {
            setClientSelectionDisabled(true);
            const client = clients.length > 0 ? clients[0] : null;
            if (client) {
              setClientSelectionPlaceHolder(getNameAndCuit(client));
              setFilters({ ...filters, client_id: client.id });
            }
          }
        },
        (error) => console.log(error)
      );
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
          {clientOptions?.map((client) => (
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
        <Button size="sm" className="search-button" onClick={handleClick}>
          <MdSearch />
          Buscar
        </Button>
        <Button size="sm" colorScheme="green" onClick={() => navigate(`/orders/new`, {replace:true})}>
          <MdCreate />
          Crear
        </Button>
      </div>
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
                  <Th>C.Suelta</Th>
                  <Th>Dev</Th>
                  <Th>FC</Th>
                  <Th>Estado</Th>
                  <Th>Ver</Th>
                </Tr>
              </Thead>
              {!loading && (
                <Tbody>
                  {searchResults?.length > 0 &&
                    searchResults.map((result) => {
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
                          <Td>{result.container_qty}</Td>
                          <Td>{result.free_load_qty}</Td>
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
                            <Link to={`/orders/${result.id}`}>
                              <MdOutlineOpenInNew />
                            </Link>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </div>
        {loading &&
          <div className="spinner">
            <Spinner className="spinner" size="xl" color="blue.500" thickness="4px" />
          </div>
        }
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
      {/* )} */}
    </div>
  );
};

export default OrderTable;
