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
  Badge,
  filter,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, Spinner } from "@chakra-ui/react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  search as searchOrders,
  statuses,
  getById,
} from "../../app/services/orderService";
import { search as searchClients } from "../../app/services/clientService";
import { getCuitAndName, getNameAndCuit } from "../../app/utils/clientUtils";
import {
  toLocalDateString,
  toLocalDateTimeString,
  trimToMinutes,
} from "../../app/utils/dateUtils";
import { getEnhancedStatus, translateStatus } from "../../app/utils/orderUtils";
import PaginationFooter from "../Pagination/paginationFooter";
import { withSession, getCurrentUser } from "../../app/utils/sessionUtils";
import { ERROR } from "../../app/utils/alertUtils";
import {
  containsLiteralPart,
  trimStringWithDot,
} from "../../app/utils/stringUtils";
import { OrderProvider, useOrderContext } from "../context/orderContext";
import LabeledItem from "../LabeledItem";
import ContainerTable from "../ContainerTable";
import FreeLoadTable from "../FreeLoadTable";
import { Select as FilteredSelect } from "chakra-react-select";
import { getOperativeSites } from "../../app/utils/customsUtils";
import ReportModal from "../ReportModal";

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
  const defaultFilters = {
    page_size: 10,
    page: 1,
  };

  const [filters, setFilters] = useState({
    ...defaultFilters,
    sorts: "creation_date:desc",
    creation_date_from: new Date().toLocaleDateString("sv"),
    creation_date_to: new Date().toLocaleDateString("sv"),
  });

  const [paginationResult, setPaginationResult] = useState();
  const [searchResults, setSearchResults] = useState();
  const [clientOptions, setClientOptions] = useState([]);
  const [consigneeOptions, setConsigneeOptions] = useState([]);
  const [clientSelectionDisabled, setClientSelectionDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSearchFilters, setCurrentSearchFilters] = useState({});
  const [selectedContainers, setSelectedContainers] = useState();
  const [selectedFreeLoads, setSelectedFreeLoads] = useState();
  const [openReportModal, setOpenReportModal] = useState(false);

  const sortOptions = [
    {
      value: "creation_date:asc",
      label: "fecha-asc",
    },
    {
      value: "creation_date:desc",
      label: "fecha-desc",
    },
    {
      value: "arrival_date:asc",
      label: "arribo-asc",
    },
    {
      value: "arrival_date:desc",
      label: "arribo-desc",
    },
    {
      value: "load_code:asc",
      label: "ctr/patente-asc",
    },
    {
      value: "load_code:desc",
      label: "ctr/patente-desc",
    },
  ];

  const handleSearchClick = async () => {
    setCurrentSearchFilters(filters);
    await search(filters);
  };

  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

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
        }
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setBlurLoading(true);
      await withSession(navigate, async () => {
        const response = await searchClients({
          page_size: 100,
          with_consignees: true,
        });
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          const clients = response.elements;
          setClientOptions(clients);
          const consignees = [];
          clients.forEach((client) => consignees.push(...client.consignees));
          setConsigneeOptions(consignees);
          if (!currentUser?.admin) {
            setClientSelectionDisabled(true);
            const client = clients.length > 0 ? clients[0] : null;
            if (client) {
              setFilters({ ...filters, client_id: client.id });
            }
          }
        }
      });

      await handleSearchClick();
      setBlurLoading(false);
    };

    fetchInitialData();
  }, []);

  const openModal = async (type, orderId) => {
    console.log(consigneeOptions);
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
      <div className="filter-bar-first-row">
        <LabeledItem
          item={
            <FilteredSelect
              filterOption={(option, input) =>
                !input || containsLiteralPart(option.label, input)
              }
              chakraStyles={{
                menu: (provided) => ({ ...provided, zIndex: 3 }),
              }}
              size="sm"
              useBasicStyles={true}
              name="client"
              value={
                filters?.client_id
                  ? {
                      label: getNameAndCuit(
                        clientOptions.find((c) => c.id === filters.client_id)
                      ),
                      value: filters.client_id,
                    }
                  : null
              }
              onChange={(e) => setFilters({ ...filters, client_id: e.value })}
              options={clientOptions?.map((client) => ({
                label: getNameAndCuit(client),
                value: client.id,
              }))}
              selectedOptionStyle="color"
              isDisabled={clientSelectionDisabled}
              placeholder="-"
            />
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
              value={filters?.creation_date_from || ""}
              onChange={(e) =>
                setFilters({ ...filters, creation_date_from: e.target.value })
              }
            />
          }
          label="Creado desde"
        />
        <LabeledItem
          item={
            <input
              className="chakra-input css-1xt0hpo"
              type="date"
              value={filters?.creation_date_to || ""}
              onChange={(e) =>
                setFilters({ ...filters, creation_date_to: e.target.value })
              }
            />
          }
          label="Creado hasta"
        />
        <LabeledItem
          item={
            <input
              className="chakra-input css-1xt0hpo"
              type="date"
              value={filters?.arrival_date_from || ""}
              onChange={(e) =>
                setFilters({ ...filters, arrival_date_from: e.target.value })
              }
            />
          }
          label="Arribo desde"
        />
        <LabeledItem
          item={
            <input
              className="chakra-input css-1xt0hpo"
              type="date"
              value={filters?.arrival_date_to || ""}
              onChange={(e) =>
                setFilters({ ...filters, arrival_date_to: e.target.value })
              }
            />
          }
          label="Arribo hasta"
        />
        <Checkbox
          onChange={(e) => setFilters({ ...filters, pema: e.target.checked })}
          isChecked={filters?.pema || false}
        >
          PEMA
        </Checkbox>
        <Checkbox
          onChange={(e) => setFilters({ ...filters, port: e.target.checked })}
          isChecked={filters?.port || false}
        >
          G. PTO
        </Checkbox>
        <Checkbox
          onChange={(e) =>
            setFilters({ ...filters, transport: e.target.checked })
          }
          isChecked={filters?.transport || false}
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
              value={filters.status ? filter.status : ""}
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
      </div>
      <div className="filter-bar-second-row">
        <LabeledItem
          item={
            <FilteredSelect
              filterOption={(option, input) =>
                !input || containsLiteralPart(option.label, input)
              }
              chakraStyles={{
                menu: (provided) => ({ ...provided, zIndex: 3 }),
              }}
              size="sm"
              useBasicStyles={true}
              name="target"
              value={
                filters?.consignee_cuit
                  ? {
                      label: getCuitAndName(
                        consigneeOptions.find(
                          (c) => c.cuit === filters?.consignee_cuit
                        )
                      ),
                      value: filters?.consignee_cuit,
                    }
                  : null
              }
              onChange={(e) =>
                setFilters({ ...filters, consignee_cuit: e.value })
              }
              options={consigneeOptions?.map((consignee) => ({
                label: getCuitAndName(consignee),
                value: consignee.cuit,
              }))}
              selectedOptionStyle="color"
              placeholder=""
            />
          }
          label="Factura a"
        />
        <LabeledItem
          item={
            <FilteredSelect
              filterOption={(option, input) =>
                !input || containsLiteralPart(option.label, input)
              }
              chakraStyles={{
                menu: (provided) => ({ ...provided, zIndex: 3 }),
              }}
              size="sm"
              useBasicStyles={true}
              name="origin"
              value={{
                label: filters?.origin,
                value: filters?.origin,
              }}
              onChange={(e) => setFilters({ ...filters, origin: e.value })}
              options={getOperativeSites().map((os) => ({
                label: os,
                value: os,
              }))}
              selectedOptionStyle="color"
            />
          }
          label="Origen"
        />
        <LabeledItem
          item={
            <FilteredSelect
              filterOption={(option, input) =>
                !input || containsLiteralPart(option.label, input)
              }
              chakraStyles={{
                menu: (provided) => ({ ...provided, zIndex: 3 }),
              }}
              size="sm"
              useBasicStyles={true}
              name="target"
              value={{
                label: filters?.target,
                value: filters?.target,
              }}
              onChange={(e) => setFilters({ ...filters, target: e.value })}
              options={getOperativeSites().map((os) => ({
                label: os,
                value: os,
              }))}
              selectedOptionStyle="color"
            />
          }
          label="Destino"
        />
        <LabeledItem
          item={
            <Input
              size="sm"
              value={filters.load_code ? filters.load_code : ""}
              onChange={(e) =>
                setFilters({ ...filters, load_code: e.target.value })
              }
            />
          }
          label="Ctr/Patente"
        />
        <LabeledItem
          item={
            <Input
              size="sm"
              value={filters.destination_code ? filters.destination_code : ""}
              onChange={(e) =>
                setFilters({ ...filters, destination_code: e.target.value })
              }
            />
          }
          label="Destinación"
        />
        <LabeledItem
          item={
            <Select
              size="sm"
              onChange={(e) =>
                setFilters({ ...filters, sorts: e.target.value })
              }
              value={filters?.sorts || ""}
              placeholder={"-"}
            >
              {sortOptions?.map((so) => (
                <option key={so.value} value={so.value}>
                  {so.label}
                </option>
              ))}
            </Select>
          }
          label="Ordenar por"
        />
      </div>
      <div className="filter-bar-third-row">
        <Button size="sm" className="search-button" onClick={handleSearchClick}>
          Buscar
        </Button>
        <Button
          size="sm"
          className="clear-button"
          onClick={() => {
            let clearFilters = defaultFilters;
            if (!currentUser?.admin) {
              clearFilters = {
                ...clearFilters,
                client_id: filters.client_id,
              };
            }
            setFilters(clearFilters);
          }}
        >
          Limpiar
        </Button>
        <Button
          size="sm"
          className="download-button"
          onClick={() => setOpenReportModal(true)}
        >
          Descargar
        </Button>
        <Button
          size="sm"
          className="create-button"
          onClick={() => navigate(`/orders/new`, { replace: true })}
        >
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
      <ReportModal
        isOpen={openReportModal}
        onClose={() => setOpenReportModal(false)}
        showAlert={showAlert}
        setBlurLoading={setBlurLoading}
        initial={{
          date_from: filters.creation_date_from,
          date_to: filters.creation_date_to,
        }}
      />
      <div>
        <div className="results-table">
          <TableContainer>
            <Table variant="striped" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>F.Creación</Th>
                  <Th>Cliente</Th>
                  <Th>F.Arribo</Th>
                  <Th>H.Arribo</Th>
                  <Th>Origen</Th>
                  <Th>Destino</Th>
                  <Th>CTR</Th>
                  <Th>C.S</Th>
                  <Th>Dev</Th>
                  <Th>FC</Th>
                  <Th>Est</Th>
                  <Th>Ver</Th>
                </Tr>
              </Thead>
              {!loading && (
                <Tbody>
                  {searchResults?.length > 0 &&
                    searchResults.map((result) => {
                      const enhancedStatus = getEnhancedStatus(result.status);
                      return (
                        <Tr className="table-row">
                          <Td
                            className="button-td"
                            onClick={() => navigate(`/orders/${result.id}`)}
                          >
                            {result.id}
                          </Td>
                          <Td>{toLocalDateTimeString(result.created_at)}</Td>
                          {clientOptions
                            .filter((c) => c.id === result.client_id)
                            .map((c) => (
                              <TableCellWithTooltip
                                text={c.name}
                                tooltipText={"CUIT: " + c.cuit}
                              />
                            ))}
                          <Td>{toLocalDateString(result.arrival_date)}</Td>
                          <Td>
                            {result.arrival_time &&
                              trimToMinutes(result.arrival_time)}
                          </Td>
                          <TableCellWithTooltip
                            text={trimStringWithDot(result?.origin || "", 12)}
                            tooltipText={result.origin}
                          />
                          <TableCellWithTooltip
                            text={trimStringWithDot(result?.target || "", 12)}
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
                          <Td>
                            {
                              <Badge colorScheme={enhancedStatus.colorScheme}>
                                {enhancedStatus.min}
                              </Badge>
                            }
                          </Td>

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
