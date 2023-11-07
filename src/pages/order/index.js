import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardBody, Spinner } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import { MdMoreVert } from "react-icons/md";
import {
  getDocumentLink,
  getById as getOrderById,
  deleteDocument,
  addDocument,
  changeStatus,
  update,
  create,
  markReturned,
  markBilled,
} from "../../app/services/orderService";
import { useNavigate, useParams } from "react-router-dom";
import { formatDestinations } from "../../app/utils/destinationUtils";
import {
  search as searchClients,
  getById as getClientById,
  getOneByUserId as getClientByUserId,
  addConsignee,
} from "../../app/services/clientService";
import { getCuitAndName, getNameAndCuit } from "../../app/utils/clientUtils";
import {
  SESSION_EXPIRED_ERROR,
  withSession,
  getCurrentUser,
} from "../../app/utils/sessionUtils";

import StatusModal from "../../components/StatusModal/statusModal";
import { getEnhancedStatus, translateStatus } from "../../app/utils/orderUtils";
import { getHalfHourOptions, trimToMinutes } from "../../app/utils/dateUtils";
import { getOperativeSites } from "../../app/utils/customsUtils";
import ContainerModal from "../../components/ContainerModal/containerModal";
import FreeLoadModal from "../../components/FreeLoadModal/freeLoadModal";
import { ERROR, SUCCESS } from "../../app/utils/alertUtils";
import NotesModal from "../../components/NoteModal/noteModal";
import CostModal from "../../components/CostModal/costModal";
import { Select as FilteredSelect } from "chakra-react-select";
import { containsLiteralPart } from "../../app/utils/stringUtils";
import LabeledItem from "../../components/LabeledItem";
import NewClientModal from "../../components/NewClientModal/newClientModal";
import ConsigneeModal from "../../components/ConsigneeModal/consigneeModal";
import NotePreview from "../../components/NotePreview";
import ConfirmDialog from "../../components/ConfirmDialog";

const ExpandButton = ({ isDisabled, onEdit, onDelete }) => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Optºions"
      icon={<MdMoreVert />}
      variant="outline"
      isDisabled={isDisabled}
    />
    <MenuList>
      <MenuItem
        onClick={() => {
          onEdit();
        }}
      >
        Editar
      </MenuItem>
      <MenuItem onClick={onDelete}>Eliminar</MenuItem>
    </MenuList>
  </Menu>
);

const Order = ({ showAlert, setBlurLoading }) => {
  const [order, setOrder] = useState({
    containers: [],
    free_loads: [],
  });
  const [clientOptions, setClientOptions] = useState([]);
  const [clientOptionsLoaded, setClientOptionsLoaded] = useState(false);
  const [consigneeOptions, setConsigneeOptions] = useState([]);
  const [pemaCode, setPemaCode] = useState("");
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openContainerModal, setOpenContainerModal] = useState(false);
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(-1);
  const [openFreeLoadModal, setOpenFreeLoadModal] = useState(false);
  const [selectedFreeLoadIndex, setSelectedFreeLoadIndex] = useState(-1);
  const [showSystemNotes, setShowSystemNotes] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);
  const [openNewClientModal, setOpenNewClientModal] = useState(false);
  const [openNewConsigneeModal, setOpenNewConsigneeModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    message: "",
    onClose: () => setConfirmDialog({ ...confirmDialog, open: false }),
    onConfirm: () => {},
  });
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  const fileInputRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchInitialData = async () => {
      setBlurLoading(true);
      await withSession(navigate, async () => {
        if (id) {
          const order = await getOrderById(id);
          if (order._isError) {
            showAlert(ERROR, order.code, order.message);
          } else {
            setOrder(order);

            if (order.containers?.length) {
              setPemaCode(order.containers[0].pema);
            } else if (order.free_loads?.length) {
              setPemaCode(order.free_loads[0].pema);
            }

            const client = await getClientById(order.client_id);
            if (client._isError) {
              showAlert(ERROR, order.code, order.message);
            } else {
              setClientOptions([...clientOptions, client]);
            }
          }
        } else if (!currentUser?.admin) {
          const client = await getClientByUserId(currentUser.id);
          if (client._isError) {
            showAlert(ERROR, order.code, order.message);
          } else {
            setClientOptions([...clientOptions, client]);
            setClientOptionsLoaded(true);
            setOrder({ ...order, client_id: client.id });
          }
        }
        setBlurLoading(false);
      });
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const updateReadOnly = () => {
      if (currentUser?.admin) {
        setReadOnly(false);
      } else {
        const readOnly = id && order?.status !== "DRAFT";
        setReadOnly(readOnly);
      }
    };

    updateReadOnly();
  }, [order]);

  useEffect(() => {
    if (order.free_load) {
      setOrder({ ...order, containers: [] });
    } else {
      setOrder({ ...order, free_loads: [] });
    }
  }, [order.free_load]);

  const loadClientOptions = async () => {
    await withSession(navigate, async () => {
      if (!clientOptionsLoaded) {
        const response = await searchClients({ page_size: 100 });
        if (response._isError) {
          showAlert(ERROR, order.code, order.message);
        } else {
          const clients = response.elements.filter(
            (c) => !id || c.id !== order.client_id
          );
          setClientOptions([...clientOptions, ...clients]);
          setClientOptionsLoaded(true);
        }
      }
    });
  };

  useEffect(() => {
    const loadConsignees = async () => {
      await withSession(navigate, async () => {
        if (order?.client_id) {
          const response = await getClientById(order.client_id, "true");
          if (response._isError) {
            showAlert(ERROR, order.code, order.message);
          } else {
            const consignees = response?.consignees?.map((c) => ({
              name: c.name,
              cuit: c.cuit,
            }));
            setConsigneeOptions(consignees);
          }
        }
      });
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

  const modifyDriverData = (e) => {
    const updatedDriverData = { ...order.driver_data };

    updatedDriverData[e.target.name] = e.target.value;
    setOrder({ ...order, driver_data: updatedDriverData });
  };

  const modifyCustomsData = (e) => {
    const updatedCustomsData = { ...order.customs_data };

    updatedCustomsData[e.target.name] = e.target.value;
    setOrder({ ...order, customs_data: updatedCustomsData });
  };

  const onDeleteDocument = async (docId, docName) => {
    setConfirmDialog({
      ...confirmDialog,
      open: true,
      message: `¿Deseas eliminar el documento "${docName}"?\n ¡Esta acción es irreversible!`,
      onConfirm: async () => {
        await withSession(
          navigate,
          async () => {
            setLoadingFiles(true);
            const response = await deleteDocument(order.id, docId);
            if (response._isError) {
              showAlert(ERROR, response.code, response.message);
            } else {
              const updatedDocuments = order.documents.filter(
                (document) => document.id !== docId
              );
              setOrder({ ...order, documents: updatedDocuments });
              showAlert(SUCCESS, "Documento eliminado");
            }
          },
          () => setLoadingFiles(false)
        );
      },
    });
  };

  const onOpenDocument = async (docId) => {
    await withSession(navigate, async () => {
      const response = await getDocumentLink(order.id, docId);
      if (response._isError) {
        showAlert(ERROR, response.code, response.message);
      } else {
        window.open(response.link, "_blank");
      }
    });
  };

  const uploadAndProcessFiles = async (selectedFiles) => {
    await withSession(
      navigate,
      async () => {
        setLoadingFiles(true);
        const promises = [...selectedFiles].map(async (file) => {
          try {
            const document = await addDocument(order.id, file);
            if (document._isError) {
              showAlert(ERROR, document.code, document.message);
              return null;
            } else {
              return document;
            }
          } catch (error) {
            if (error === SESSION_EXPIRED_ERROR) {
              throw error;
            }

            return null;
          }
        });

        const processedFiles = await Promise.all(promises);
        const successfulFiles = processedFiles.filter((file) => file !== null);

        setOrder({
          ...order,
          documents: [...order.documents, ...successfulFiles],
        });
        if (processedFiles.length === successfulFiles.length) {
          showAlert(SUCCESS, "Documentos guardados");
        }
      },
      () => setLoadingFiles(false)
    );
  };

  const handleSave = async (finalAction = true) => {
    setActionLoading(true);
    await withSession(
      navigate,
      async () => {
        // Set PEMA code in containers and freeloads
        const updatedContainers = { ...order.containers };
        const updatedFreeLoads = { ...order.free_loads };

        for (const containerId in updatedContainers) {
          const container = updatedContainers[containerId];
          if (container) {
            container.pema = pemaCode;
          }
        }

        for (const freeLoadId in updatedFreeLoads) {
          const freeLoad = updatedFreeLoads[freeLoadId];
          if (freeLoad) {
            freeLoad.pema = pemaCode;
          }
        }

        let response;
        if (id) {
          response = await update(id, order);
        } else {
          response = await create(order);
        }

        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setOrder(response);
          if (finalAction) {
            showAlert(SUCCESS, "Cambios guardados");
            if (!id) {
              navigate("/orders/" + response.id);
            }
          }
        }
      },
      () => {
        if (finalAction) {
          setActionLoading(false);
        }
      }
    );
  };

  const openStatus = () => {
    setOpenStatusModal(true);
  };

  const openCosts = () => {
    setOpenCostModal(true);
  };

  const handleSend = async () => {
    setConfirmDialog({
      ...confirmDialog,
      open: true,
      message:
        "¿Deseas enviar la solicitud para su revisión?\n ¡Esta acción no puede revertirse!",
      onConfirm: async () => {
        await handleSave(false);
        await handleStatusChange("REVISION");
      },
    });
  };

  const handleStatusChange = async (status) => {
    if (id) {
      setActionLoading(true);
      await withSession(
        navigate,
        async () => {
          const response = await changeStatus(id, status);
          if (response._isError) {
            showAlert(ERROR, response.code, response.message);
          } else {
            setOrder({ ...order, status });
            showAlert(SUCCESS, "Estado de solicitud cambiado");
          }
        },
        () => setActionLoading(false)
      );
    }
  };

  const onReturned = async () => {
    setConfirmDialog({
      ...confirmDialog,
      open: true,
      message: "¿Deseas modificar el valor de DEV?",
      onConfirm: async () => {
        setActionLoading(true);
        const newReturned = !order.returned;

        const response = await markReturned(order.id, newReturned);
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setOrder({ ...order, returned: newReturned });
          showAlert(SUCCESS, "Cambios guardados");
        }
        setActionLoading(false);
      },
    });
  };

  const onBilled = async () => {
    setConfirmDialog({
      ...confirmDialog,
      open: true,
      message: "¿Deseas modificar el valor de FC?",
      onConfirm: async () => {
        setActionLoading(true);
        const newBilled = !order.billed;

        const response = await markBilled(order.id, newBilled);
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setOrder({ ...order, billed: newBilled });
          showAlert(SUCCESS, "Cambios guardados");
        }
        setActionLoading(false);
      },
    });
  };

  const handleContainerSave = (container) => {
    const updatedOrder = { ...order };

    if (selectedContainerIndex === -1) {
      updatedOrder.containers.push(container);
    } else {
      updatedOrder.containers[selectedContainerIndex] = container;
    }

    setOrder(updatedOrder);
  };

  const deleteContainer = (index) => {
    const updatedContainers = [...order.containers];
    updatedContainers.splice(index, 1);
    setOrder({ ...order, containers: updatedContainers });
  };

  const handleFreeLoadSave = (freeLoad) => {
    const updatedOrder = { ...order };

    if (selectedFreeLoadIndex === -1) {
      updatedOrder.free_loads.push(freeLoad);
    } else {
      updatedOrder.free_loads[selectedFreeLoadIndex] = freeLoad;
    }

    setOrder(updatedOrder);
  };

  const deleteFreeLoad = (index) => {
    const updatedFreeLoads = [...order.free_loads];
    updatedFreeLoads.splice(index, 1);
    setOrder({ ...order, free_loads: updatedFreeLoads });
  };

  const onNewClientSave = (client) => {
    setClientOptions([...clientOptions, client]);
    setOrder({ ...order, client_id: client.id });
  };

  const onNewConsigneeSave = async (consignee) => {
    await withSession(navigate, async () => {
      const response = await addConsignee(order.client_id, consignee);
      if (response._isError) {
        showAlert(ERROR, response.code, response.message);
      } else {
        const orderConsignees = {
          name: response.name,
          cuit: response.cuit,
        };
        setConsigneeOptions([...consigneeOptions, orderConsignees]);
        setOrder({ ...order, consignee: orderConsignees });
        showAlert(SUCCESS, "Consignatario guardado");
      }
    });
  };

  const onNoteSaved = (note) => {
    const updatedNotes = order.notes ? order.notes : [];
    updatedNotes.push(note);

    setOrder({ ...order, notes: updatedNotes });
  };

  return (
    <div className="order-container">
      <Card variant="outline" className="order-card">
        <CardHeader className="order-card-header">
          <div className="heading-order-code">
            <Heading size="sm" className="order-heading">
              Solicitud #{order?.id} /{" "}
            </Heading>
            <Input
              name="code"
              variant="flushed"
              placeholder="Legajo"
              size="sm"
              value={order.code}
              onChange={onInputChange}
              disabled={readOnly}
            />
          </div>
          <div className="order-actions">
            <div className="center-actions">
              <Badge
                fontSize="m"
                className={currentUser?.admin && id && "editable-status"}
                colorScheme={
                  order?.status
                    ? getEnhancedStatus(order.status).colorScheme
                    : "gray"
                }
                variant="subtle"
                onClick={() => {
                  if (currentUser?.admin && id) {
                    openStatus();
                  }
                }}
              >
                {order?.status ? translateStatus(order.status) : "BORRADOR"}
              </Badge>
              {currentUser?.admin && (
                <Checkbox
                  className="services-checkbox"
                  name="dev"
                  isChecked={order.returned}
                  onChange={onReturned}
                  disabled={!id}
                >
                  DEV
                </Checkbox>
              )}
              {currentUser?.admin && (
                <Checkbox
                  className="services-checkbox"
                  name="dev"
                  isChecked={order.billed}
                  onChange={onBilled}
                  disabled={!id}
                >
                  FC
                </Checkbox>
              )}
            </div>
            <div className="right-actions">
              <Button
                size="sm"
                className="save-button"
                isDisabled={readOnly}
                onClick={handleSave}
                isLoading={actionLoading}
              >
                Guardar
              </Button>
              {currentUser?.admin ? (
                <Button
                  size="sm"
                  className="costs-button"
                  isDisabled={!id}
                  onClick={openCosts}
                >
                  Costos
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="send-button"
                  isDisabled={!id || readOnly}
                  onClick={handleSend}
                >
                  Enviar
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <StatusModal
          isOpen={openStatusModal}
          onClose={() => setOpenStatusModal(false)}
          onSave={async (status) => {
            await handleStatusChange(status);
            setOpenStatusModal(false);
          }}
          currentStatus={order?.status}
        />

        <ConfirmDialog
          isOpen={confirmDialog.open}
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onClose={confirmDialog.onClose}
        />

        {openContainerModal && (
          <ContainerModal
            isOpen={openContainerModal}
            initialValue={
              selectedContainerIndex >= 0 &&
              order?.containers[selectedContainerIndex]
            }
            readOnly={readOnly}
            onSave={handleContainerSave}
            onClose={() => {
              setSelectedContainerIndex(-1);
              setOpenContainerModal(false);
            }}
            initialBls={order?.containers
              .map((c) => c.bl)
              .filter((bl) => bl && bl.trim() !== "")
              .filter((value, index, self) => self.indexOf(value) === index)}
            initialDestinations={order?.containers
              .map((c) => c.destinations)
              .flat()
              .filter(
                (dest, index, self) =>
                  self.findIndex((d) => d.code === dest.code) === index
              )}
          />
        )}

        {openFreeLoadModal && (
          <FreeLoadModal
            isOpen={openFreeLoadModal}
            initialValue={
              selectedFreeLoadIndex >= 0 &&
              order?.free_loads[selectedFreeLoadIndex]
            }
            readOnly={readOnly}
            onSave={handleFreeLoadSave}
            onClose={() => {
              setSelectedFreeLoadIndex(-1);
              setOpenFreeLoadModal(false);
            }}
            initialDestinations={order?.free_loads
              .map((fl) => fl.destinations)
              .flat()
              .filter(
                (dest, index, self) =>
                  self.findIndex((d) => d.code === dest.code) === index
              )}
          />
        )}

        {openNoteModal && (
          <NotesModal
            isOpen={openNoteModal}
            onClose={() => setOpenNoteModal(false)}
            orderId={order?.id}
            showAlert={showAlert}
            onNoteSaved={onNoteSaved}
          />
        )}

        {openCostModal && (
          <CostModal
            isOpen={openCostModal}
            onClose={() => setOpenCostModal(false)}
            orderId={order?.id}
            showAlert={showAlert}
          />
        )}

        {openNewClientModal && (
          <NewClientModal
            isOpen={openNewClientModal}
            onClose={() => setOpenNewClientModal(false)}
            showAlert={showAlert}
            setBlurLoading={() => {}}
            afterSave={onNewClientSave}
          />
        )}

        {openNewConsigneeModal && (
          <ConsigneeModal
            isOpen={openNewConsigneeModal}
            onClose={() => setOpenNewConsigneeModal(false)}
            onSave={onNewConsigneeSave}
          />
        )}

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
                  isDisabled={readOnly}
                >
                  PEMA
                </Checkbox>
                <Checkbox
                  className="services-checkbox"
                  name="port"
                  isChecked={order.port}
                  onChange={onCheckChange}
                  isDisabled={readOnly}
                >
                  Gestión portuaria
                </Checkbox>
                <Checkbox
                  className="services-checkbox"
                  name="transport"
                  isChecked={order.transport}
                  onChange={onCheckChange}
                  isDisabled={readOnly}
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
                isDisabled={readOnly}
              >
                Carga suelta
              </Checkbox>
            </div>
          </div>

          <Divider variant="dashed" />

          <div className="main-content">
            <div className="left-column">
              <div className="first-row">
                <Heading as="h6" size="sm" className="row-heading">
                  Cliente
                </Heading>
                <Stack spacing={3}>
                  <div className="client">
                    <LabeledItem
                      className="row-top-element"
                      item={
                        <FilteredSelect
                          filterOption={(option, input) =>
                            !input || containsLiteralPart(option.label, input)
                          }
                          chakraStyles={{
                            menu: (provided) => ({ ...provided, zIndex: 3 }),
                          }}
                          onFocus={loadClientOptions}
                          size="sm"
                          useBasicStyles={true}
                          name="client"
                          value={
                            order?.client_id
                              ? {
                                  label: getNameAndCuit(
                                    clientOptions.find(
                                      (c) => c.id === order.client_id
                                    )
                                  ),
                                  value: order.client_id,
                                }
                              : null
                          }
                          isDisabled={readOnly || !currentUser?.admin}
                          onChange={(e) =>
                            setOrder({ ...order, client_id: e.value })
                          }
                          options={clientOptions?.map((client) => ({
                            label: getNameAndCuit(client),
                            value: client.id,
                          }))}
                          selectedOptionStyle="color"
                          placeholder=""
                        />
                      }
                      label="Cliente"
                    />
                    {currentUser?.admin && (
                      <IconButton
                        icon={<AddIcon />}
                        size="xs"
                        onClick={() => setOpenNewClientModal(true)}
                        className="add-icon"
                      />
                    )}
                  </div>
                  <div className="consignee">
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
                          name="consignee"
                          value={
                            order?.consignee
                              ? {
                                  label: getCuitAndName(order.consignee),
                                  value: JSON.stringify(order.consignee),
                                }
                              : null
                          }
                          isDisabled={readOnly}
                          onChange={(e) =>
                            setOrder({
                              ...order,
                              consignee: JSON.parse(e.value),
                            })
                          }
                          options={consigneeOptions?.map((consignee) => ({
                            label: getCuitAndName(consignee),
                            value: JSON.stringify(consignee),
                          }))}
                          selectedOptionStyle="color"
                          placeholder=""
                        />
                      }
                      label="Factura a"
                    />
                    <IconButton
                      icon={<AddIcon />}
                      size="xs"
                      isDisabled={readOnly || !order?.client_id}
                      onClick={() => setOpenNewConsigneeModal(true)}
                      className="add-icon"
                    />
                  </div>
                </Stack>
              </div>
              <div className="second-row">
                <div className="title">
                  <Heading as="h6" size="sm" className="row-heading">
                    Documentación
                  </Heading>
                  <Input
                    type="file"
                    accept=".pdf, .png, .jpg, .doc, .txt, .xml, .css"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                      uploadAndProcessFiles(e.target.files);
                    }}
                    ref={fileInputRef}
                  />
                  <IconButton
                    icon={<AddIcon />}
                    size="xs"
                    isLoading={loadingFiles}
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                    className="add-doc-icon"
                    isDisabled={!order?.id}
                  />
                </div>
                <Stack spacing={2}>
                  {/* Display the list of documents */}
                  {order.documents?.map((document) => (
                    <div key={document.id} className="document-item">
                      <span
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => onOpenDocument(document.id)}
                      >
                        {document.name}
                      </span>
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        onClick={() =>
                          onDeleteDocument(document.id, document.name)
                        }
                        isDisabled={readOnly}
                      />
                    </div>
                  ))}
                </Stack>
              </div>
              <div className="third-row">
                <div className="title">
                  <div className="left-part">
                    <Heading as="h6" size="sm" className="row-heading">
                      Notas
                    </Heading>
                    <IconButton
                      icon={<AddIcon />}
                      size="xs"
                      onClick={() => setOpenNoteModal(true)}
                      className="add-note-icon"
                      isDisabled={!order?.id}
                    />
                  </div>
                  {currentUser?.admin && (
                    <Checkbox
                      isChecked={showSystemNotes}
                      isDisabled={!order?.id}
                      onChange={() => setShowSystemNotes((prev) => !prev)}
                    >
                      Sistema
                    </Checkbox>
                  )}
                </div>
                <NotePreview
                  notes={
                    order?.notes?.sort((a, b) =>
                      b.created_at.localeCompare(a.created_at)
                    ) || []
                  }
                  showSystemNotes={showSystemNotes}
                />
              </div>
            </div>
            <div className="right-column">
              <div className="first-row">
                <Heading as="h6" size="sm" className="row-heading">
                  Datos de servicio
                </Heading>
                <Stack spacing={3} className="first-row-stack">
                  <LabeledItem
                    item={
                      <input
                        className="chakra-input css-1xt0hpo"
                        value={order?.arrival_date}
                        type="date"
                        name="arrival_date"
                        disabled={readOnly}
                        onChange={onInputChange}
                      />
                    }
                    label="F.Turno"
                  />
                  <LabeledItem
                    item={
                      <Select
                        size="sm"
                        value={
                          order?.arrival_time
                            ? trimToMinutes(order.arrival_time)
                            : null
                        }
                        name="arrival_time"
                        isDisabled={readOnly}
                        onChange={onInputChange}
                      >
                        {getHalfHourOptions().map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    }
                    label="H.Turno"
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
                        isDisabled={readOnly}
                        value={{
                          label: order?.origin,
                          value: order?.origin,
                        }}
                        onChange={(e) => modifyOrder("origin", e.value)}
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
                        isDisabled={readOnly}
                        value={{
                          label: order?.target,
                          value: order?.target,
                        }}
                        onChange={(e) => modifyOrder("target", e.value)}
                        options={getOperativeSites().map((os) => ({
                          label: os,
                          value: os,
                        }))}
                        selectedOptionStyle="color"
                      />
                    }
                    label="Destino"
                  />
                </Stack>
              </div>
              <div className="second-row">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Heading as="h6" size="sm" className="row-heading">
                      Transporte
                    </Heading>
                    <Grid templateRows="repeat(3, 1fr)" gap={4}>
                      <GridItem colSpan={2}>
                        <LabeledItem
                          item={
                            <Input
                              className="row-top-element"
                              size="sm"
                              name="name"
                              value={order?.driver_data?.name}
                              isDisabled={readOnly}
                              onChange={modifyDriverData}
                            />
                          }
                          label="Nombre"
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <LabeledItem
                          item={
                            <Input
                              className="row-top-element"
                              size="sm"
                              name="phone"
                              value={order?.driver_data?.phone}
                              isDisabled={readOnly}
                              onChange={modifyDriverData}
                            />
                          }
                          label="Teléfono"
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <LabeledItem
                          item={
                            <Input
                              className="row-top-element"
                              size="sm"
                              name="chasis"
                              value={order?.driver_data?.chasis}
                              isDisabled={readOnly}
                              onChange={modifyDriverData}
                            />
                          }
                          label="Chasis"
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <LabeledItem
                          item={
                            <Input
                              className="row-top-element"
                              size="sm"
                              name="semi"
                              value={order?.driver_data?.semi}
                              isDisabled={readOnly}
                              onChange={modifyDriverData}
                            />
                          }
                          label="Semi"
                        />
                      </GridItem>
                      <GridItem colSpan={4}>
                        <LabeledItem
                          item={
                            <Input
                              size="sm"
                              name="company"
                              value={order?.driver_data?.company}
                              isDisabled={readOnly}
                              onChange={modifyDriverData}
                            />
                          }
                          label="Empresa"
                        />
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Heading as="h6" size="sm" className="row-heading">
                      Comisionista
                    </Heading>
                    <Grid gap={4}>
                      <GridItem>
                        <LabeledItem
                          item={
                            <Input
                              className="row-top-element"
                              size="sm"
                              name="name"
                              value={order?.customs_data?.name}
                              isDisabled={readOnly}
                              onChange={modifyCustomsData}
                            />
                          }
                          label="Nombre"
                        />
                      </GridItem>
                      <GridItem>
                        <LabeledItem
                          item={
                            <Input
                              size="sm"
                              name="phone"
                              value={order?.customs_data?.phone}
                              isDisabled={readOnly}
                              onChange={modifyCustomsData}
                            />
                          }
                          label="Teléfono"
                        />
                      </GridItem>
                    </Grid>
                  </GridItem>
                </Grid>
              </div>

              <div className="third-row">
                <Heading className="third-row-heading" as="h6" size="sm">
                  {(order.free_load && <Text>Carga suelta</Text>) || (
                    <Text>Contenedores</Text>
                  )}
                  <Button
                    colorScheme="green"
                    size="xs"
                    isDisabled={readOnly}
                    onClick={() => {
                      if (order?.free_load) {
                        setSelectedFreeLoadIndex(-1);
                        setOpenFreeLoadModal(true);
                      } else {
                        setSelectedContainerIndex(-1);
                        setOpenContainerModal(true);
                      }
                    }}
                  >
                    + Añadir
                  </Button>
                </Heading>
                {order.free_load ? (
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
                        {order.free_loads?.map((fl, index) => {
                          return (
                            <Tr className="table-row">
                              <Td>{fl.patent}</Td>
                              <Td>{fl.type}</Td>
                              <Td>{fl.guide}</Td>
                              <Td>{formatDestinations(fl.destinations)}</Td>
                              <Td>{fl.weight}</Td>
                              <Td>
                                <ExpandButton
                                  isDisabled={readOnly}
                                  onEdit={() => {
                                    setSelectedFreeLoadIndex(index);
                                    setOpenFreeLoadModal(true);
                                  }}
                                  onDelete={() => deleteFreeLoad(index)}
                                />
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <>
                    {currentUser?.admin && (
                      <div className="subtitle">
                        <LabeledItem
                          item={
                            <Select
                              size="sm"
                              value={pemaCode}
                              onChange={(e) => setPemaCode(e.target.value)}
                              placeholder="-"
                            >
                              {["SAETECH", "CONTROLCARGO", "SISTELCOM"].map(
                                (p) => (
                                  <option key={p} value={p}>
                                    {p}
                                  </option>
                                )
                              )}
                            </Select>
                          }
                          label="PEMA"
                        />
                      </div>
                    )}
                    <TableContainer>
                      <Table size="sm" variant="striped">
                        <Thead>
                          <Tr>
                            <Th>Contenedor</Th>
                            <Th>Tipo</Th>
                            <Th>BL</Th>
                            <Th>Destinación</Th>
                            <Th>Reenvase</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.containers?.map((container, index) => {
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
                                  <ExpandButton
                                    isDisabled={readOnly}
                                    onEdit={() => {
                                      setSelectedContainerIndex(index);
                                      setOpenContainerModal(true);
                                    }}
                                    onDelete={() => deleteContainer(index)}
                                  />
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Order;
