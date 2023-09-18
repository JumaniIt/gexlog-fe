import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";

import { MdMoreVert } from "react-icons/md";
import {
  getDocumentLink,
  getById as getOrderById,
  deleteDocument,
} from "../../app/services/orderService";
import { useParams } from "react-router-dom";
import { formatDestinations } from "../../app/utils/destinationUtils";
import {
  search as searchClients,
  getById as getClientById,
} from "../../app/services/clientService";
import { getNameAndCuit } from "../../app/utils/clientUtils";

const ExpandButton = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<MdMoreVert />}
      variant="outline"
    />
    <MenuList>
      <MenuItem /* icon={<AddIcon />} */>Editar</MenuItem>
      <MenuItem /* icon={<ExternalLinkIcon />} */>Eliminar</MenuItem>
    </MenuList>
  </Menu>
);

const Order = ({}) => {
  const [order, setOrder] = useState({});
  const [clientOptions, setClientOptions] = useState([]);
  const [clientOptionsLoaded, setClientOptionsLoaded] = useState(false);
  const [consigneeOptions, setConsigneeOptions] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchInitialData = async () => {
      if (id) {
        try {
          const order = await getOrderById(id);
          setOrder(order);

          const client = await getClientById(order.client_id);
          setClientOptions([...clientOptions, client]);
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };

    fetchInitialData();
  }, []);

  const loadClientOptions = async () => {
    if (!clientOptionsLoaded) {
      const options = await searchClients({ page_size: 100 });
      const clients = options.elements.filter(
        (c) => !id || c.id !== order.client_id
      );
      setClientOptions([...clientOptions, ...clients]);
      setClientOptionsLoaded(true);
    }
  };

  useEffect(() => {
    const loadConsignees = async () => {
      try {
        const client = await getClientById(order.client_id, "true");
        const consignees = client?.consignees?.map((c) => ({
          name: c.name,
          cuit: c.cuit,
        }));
        setConsigneeOptions([...consignees]);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    loadConsignees();
  }, [order?.client_id]);

  const onInputChange = (e) => {
    modifyOrder(e.target.name, e.target.value);
  };

  const onCheckChange = (e) => {
    modifyOrder(e.target.name, e.target.checked);
  };

  const modifyOrder = (field, value) => {
    setOrder({ ...order, [field]: value });
  };

  const onDeleteDocument = async (docId) => {
    try {
      await deleteDocument(order.id, docId);
      const updatedDocuments = order.documents.filter(
        (document) => document.id !== docId
      );
      setOrder({ ...order, documents: updatedDocuments });
      
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const onOpenDocument = async (docId) => {
    try {
      const link = await getDocumentLink(order.id, docId);

      window.open(link, "_blank");
    } catch (error) {
      console.error("Error opening document:", error);
    }
  };

  return (
    <Layout className="order-container" headingText={`< Volver`}>
      <Card variant="outline" className="order-card">
        <CardHeader className="order-card-header">
          <Heading size="sm" className="order-heading">
            Solicitud #{order.id} /{" "}
          </Heading>
          <Input
            name="code"
            variant="flushed"
            placeholder="Legajo"
            size="sm"
            value={order.code}
            onChange={onInputChange}
          />
        </CardHeader>
        <Divider className="order-divider" />
        <CardBody>
          <div className="top-row">
            <div className="services">
              <Heading as="h6" size="xs">
                Servicios
              </Heading>
              <Stack spacing={5} direction="row">
                <Checkbox
                  className="services-checkbox"
                  name="pema"
                  isChecked={order.pema}
                  onChange={onCheckChange}
                >
                  PEMA
                </Checkbox>
                <Checkbox
                  className="services-checkbox"
                  name="port"
                  isChecked={order.port}
                  onChange={onCheckChange}
                >
                  Gestión portuaria
                </Checkbox>
                <Checkbox
                  className="services-checkbox"
                  name="transport"
                  isChecked={order.transport}
                  onChange={onCheckChange}
                >
                  Transporte
                </Checkbox>
              </Stack>
            </div>
            <div className="extra">
              <Checkbox
                className="services-checkbox"
                name="free_load"
                isChecked={order.free_load}
                onChange={onCheckChange}
              >
                Carga suelta
              </Checkbox>
            </div>
          </div>

          <Divider variant="dashed" />

          <div className="main-content">
            <div className="left-column">
              <div className="first-row">
                <Heading as="h6" size="sm">
                  Cliente
                </Heading>
                <Stack spacing={3}>
                  <Select
                    size="sm"
                    placeholder="Cliente"
                    name="client_id"
                    value={order?.client_id}
                    onFocus={loadClientOptions}
                    onChange={onInputChange}
                  >
                    {clientOptions.map((client) => (
                      <option key={client.id} value={client.id}>
                        {getNameAndCuit(client)}
                      </option>
                    ))}
                  </Select>

                  <Select
                    size="sm"
                    name="consignee"
                    placeholder="Factura a"
                    onChange={onInputChange}
                    value={order?.consignee}
                  >
                    {consigneeOptions.map((consignee) => (
                      <option key={consignee} value={consignee}>
                        {getNameAndCuit(consignee)}
                      </option>
                    ))}
                  </Select>
                </Stack>
              </div>
              <div className="second-row">
                <div className="title">
                  <Heading as="h6" size="sm">
                    Documentación
                  </Heading>
                  <IconButton
                    icon={<AddIcon />}
                    size="xs"
                    className="add-doc-icon"
                  />
                </div>
                <Stack spacing={2}>
                  {/* Display the list of documents */}
                  {order.documents?.map((document) => (
                    <div key={document.id} className="document-item">
                      <span>{document.name}</span>
                      <IconButton
                        icon={<ViewIcon />}
                        size="xs"
                        onClick={() => onOpenDocument(document.id)} // Call the open document function with the document ID
                        mr={2} // Add some right margin for spacing
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        onClick={() => onDeleteDocument(document.id)} // Call the delete function with the document ID
                      />
                    </div>
                  ))}
                </Stack>
              </div>
            </div>
            <div className="right-column">
              <div className="first-row">
                <Heading as="h6" size="sm">
                  Datos de servicio
                </Heading>
                <Stack spacing={3} className="first-row-stack">
                  <Select size="sm" placeholder={order.arrival_date || "Fecha"}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  <Select size="sm" placeholder={order.arrival_time || "Hora"}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  <Select size="sm" placeholder={order.origin || "Origen"}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  <Select size="sm" placeholder={order.target || "Destino"}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Stack>
              </div>
              <div className="second-row">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Heading as="h6" size="sm">
                      Transporte
                    </Heading>
                    <Grid templateRows="repeat(3, 1fr)" gap={4}>
                      <GridItem colSpan={2}>
                        <Input
                          size="sm"
                          placeholder="Nombre"
                          value={order?.driver_data?.name}
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Input
                          size="sm"
                          placeholder="Teléfono"
                          value={order?.driver_data?.phone}
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Input
                          size="sm"
                          placeholder="Chasis"
                          value={order?.driver_data?.chasis}
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Input
                          size="sm"
                          placeholder="Semi"
                          value={order?.driver_data?.semi}
                        />
                      </GridItem>
                      <GridItem colSpan={4}>
                        <Input
                          size="sm"
                          placeholder="Empresa"
                          value={order?.driver_data?.company}
                        />
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Heading as="h6" size="sm">
                      Comisionista
                    </Heading>
                    <Grid gap={4}>
                      <GridItem>
                        <Input
                          size="sm"
                          placeholder="Nombre"
                          value={order?.customs_data?.name}
                        />
                      </GridItem>
                      <GridItem>
                        <Input
                          size="sm"
                          placeholder="Teléfono"
                          value={order?.customs_data?.phone}
                        />
                      </GridItem>
                    </Grid>
                  </GridItem>
                </Grid>
              </div>
              {order.free_load ? (
                <div className="third-row">
                  <Heading as="h6" size="sm">
                    Carga suelta
                  </Heading>
                  <div className="subtitle">
                    <Button size="xs">+ Añadir</Button>
                  </div>
                  <TableContainer>
                    <Table size="sm" variant="striped">
                      <Thead>
                        <Tr>
                          <Th>Patente</Th>
                          <Th>Tipo</Th>
                          <Th>Guía</Th>
                          <Th>Destinación</Th>
                          <Th>Peso</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.free_loads.map((fl) => {
                          return (
                            <Tr className="table-row">
                              <Td>{fl.patent}</Td>
                              <Td>{fl.type}</Td>
                              <Td>{fl.guide}</Td>
                              <Td>{formatDestinations(fl.destinations)}</Td>
                              <Td>{fl.weight}</Td>
                              <Td>
                                <ExpandButton />
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <div className="third-row">
                  <Heading as="h6" size="sm">
                    Contenedores
                  </Heading>
                  <div className="subtitle">
                    <Input size="sm" placeholder="PEMA" />
                    <Button size="xs">+ Añadir</Button>
                  </div>
                  <TableContainer>
                    <Table size="sm" variant="striped">
                      <Thead>
                        <Tr>
                          <Th>Código</Th>
                          <Th>Tipo</Th>
                          <Th>BL</Th>
                          <Th>Destinación</Th>
                          <Th>Reenvase</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.containers?.map((container) => {
                          return (
                            <Tr className="table-row">
                              <Td>{container.code}</Td>
                              <Td>{container.type}</Td>
                              <Td>{container.bl}</Td>
                              <Td>
                                {formatDestinations(container.destinations)}
                              </Td>
                              <Td>{container.repackage ? "SI" : "NO"}</Td>
                              <Td>
                                <ExpandButton />
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Order;
