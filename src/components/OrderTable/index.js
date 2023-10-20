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
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
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
  getById,
} from "../../app/services/orderService";
import { search as searchClients } from "../../app/services/clientService";
import { getNameAndCuit } from "../../app/utils/clientUtils";
import { trimToMinutes } from "../../app/utils/dateUtils";
import { translateStatus } from "../../app/utils/orderUtils";
import PaginationFooter from "../Pagination/paginationFooter";
import { withSession, getCurrentUser } from "../../app/utils/sessionUtils";
import { ERROR } from "../../app/utils/alertUtils";
import { trimStringWithDot } from "../../app/utils/stringUtils";
import { OrderProvider, useOrderContext } from "../context/orderContext";
import LabeledItem from "../LabeledItem";
import ContainerTable from "../ContainerTable";
import FreeLoadTable from "../FreeLoadTable";

const TableCellWithTooltip = ({ text, tooltipText }) => {
  return (
    <Td>
      <Tooltip label={tooltipText}>
        <Text>{text}</Text>
      </Tooltip>
    </Td>
  );
};

const OrderTable = ({ showAlert, setBlurLoading }) => {
  const { orderSearchContext, setOrderSearchContext } = useOrderContext();

  const [filters, setFilters] = useState({
    date_from: new Date().toLocaleDateString("sv"),
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
  const [selectedContainers, setSelectedContainers] = useState();
  const [selectedFreeLoads, setSelectedFreeLoads] = useState();

  const handleSearchClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const navigate = useNavigate();

  const search = async (f) => {
    setLoading(true);
    await withSession(
      navigate,
      async () => {
        const response = await searchOrders(f);
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setSearchResults(response?.elements);
          setPaginationResult({
            totalPages: response.total_pages,
            page: response.page,
          });
          setOrderSearchContext({ results: response, filters: filters });
        }
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setBlurLoading(true);
      await withSession(navigate, async () => {
        const response = await searchClients({ page_size: 100 });
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          const clients = response.elements;
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
        }
      });

      if (orderSearchContext.results) {
        const results = orderSearchContext.results;
        setSearchResults(results.elements);
        setPaginationResult({
          totalPages: results.total_pages,
          page: results.page,
        });

        setFilters(orderSearchContext.filters);
      } else {
        await handleSearchClick();
      }

      setBlurLoading(false);
    };

    fetchInitialData();
  }, []);

  const openModal = async (type, orderId) => {
    await withSession(navigate, async () => {
      const response = await getById(orderId);
      if (response._isError) {
        showAlert(ERROR, response.code, response.message);
      } else {
        if (type === "containers") {
          setSelectedContainers(response.containers);
        } else {
          setSelectedFreeLoads(response.free_loads);
        }
      }
    });
  };

  return (
    <div className="filter-table-container">
      <div className="filter-bar">
        <LabeledItem
          item={
            <Select
              size="sm"
              isDisabled={clientSelectionDisabled}
              onChange={(e) =>
                setFilters({ ...filters, client_id: e.target.value })
              }
              value={filters?.client_id}
              placeholder={clientSelectionPlaceHolder || "-"}
            >
              {clientOptions?.map((client) => (
                <option key={client.id} value={client.id}>
                  {getNameAndCuit(client)}
                </option>
              ))}
            </Select>
          }
          label="Cliente"
        />

        <LabeledItem
          item={
            <Input
              size="sm"
              value={filters?.code}
              onChange={(e) => setFilters({ ...filters, code: e.target.value })}
            />
          }
          label="Legajo"
        />
        <LabeledItem
          item={
            <input
              className="chakra-input css-1xt0hpo"
              type="date"
              value={filters?.date_from}
              onChange={(e) =>
                setFilters({ ...filters, date_from: e.target.value })
              }
            />
          }
          label="Desde"
        />
        <LabeledItem
          item={
            <input
              className="chakra-input css-1xt0hpo"
              type="date"
              value={filters?.date_to}
              onChange={(e) =>
                setFilters({ ...filters, date_to: e.target.value })
              }
            />
          }
          label="Hasta"
        />
        <Checkbox
          onChange={(e) => setFilters({ ...filters, pema: e.target.checked })}
          isChecked={filters?.pema}
        >
          PEMA
        </Checkbox>
        <Checkbox
          onChange={(e) => setFilters({ ...filters, port: e.target.checked })}
          isChecked={filters?.port}
        >
          G. PTO
        </Checkbox>
        <Checkbox
          onChange={(e) =>
            setFilters({ ...filters, transport: e.target.checked })
          }
          isChecked={filters?.transport}
        >
          TTE
        </Checkbox>
        <LabeledItem
          item={
            <Select
              size="sm"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              value={filters?.status}
              placeholder="-"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.translation}
                </option>
              ))}
            </Select>
          }
          label="Estado"
        />
        <Button size="sm" className="search-button" onClick={handleSearchClick}>
          <MdSearch />
          Buscar
        </Button>
        <Button
          size="sm"
          colorScheme="green"
          onClick={() => navigate(`/orders/new`, { replace: true })}
        >
          <MdCreate />
          Crear
        </Button>
      </div>

      <Modal
        isOpen={selectedContainers}
        onClose={() => setSelectedContainers(null)}
      >
        <ModalOverlay />
        <ModalContent className="order-table-modal">
          <ModalCloseButton />
          <ModalBody>
            <ContainerTable containers={selectedContainers} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={selectedFreeLoads}
        onClose={() => setSelectedFreeLoads(null)}
      >
        <ModalOverlay />
        <ModalContent className="order-table-modal">
          <ModalCloseButton />
          <ModalBody>
            <FreeLoadTable freeLoads={selectedFreeLoads} />
          </ModalBody>
        </ModalContent>
      </Modal>

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
                          {clientOptions
                            .filter((c) => c.id === result.client_id)
                            .map((c) => (
                              <TableCellWithTooltip
                                text={c.name}
                                tooltipText={"CUIT: " + c.cuit}
                              />
                            ))}
                          <Td>{result.arrival_date}</Td>
                          <Td>
                            {result.arrival_time &&
                              trimToMinutes(result.arrival_time)}
                          </Td>
                          <TableCellWithTooltip
                            text={trimStringWithDot(result?.origin || "", 15)}
                            tooltipText={result.origin}
                          />
                          <TableCellWithTooltip
                            text={trimStringWithDot(result?.target || "", 15)}
                            tooltipText={result.target}
                          />
                          <Td
                            className={
                              result.container_qty > 0 ? "button-td" : ""
                            }
                            onClick={() => openModal("containers", result.id)}
                          >
                            {result.container_qty}
                          </Td>
                          <Td
                            className={
                              result.free_load_qty > 0 ? "button-td" : ""
                            }
                            onClick={() => openModal("free_loads", result.id)}
                          >
                            {result.free_load_qty}
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
        {loading && (
          <div className="spinner">
            <Spinner
              className="spinner"
              size="xl"
              color="blue.500"
              thickness="4px"
            />
          </div>
        )}
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
    </div>
  );
};

export default OrderTable;
