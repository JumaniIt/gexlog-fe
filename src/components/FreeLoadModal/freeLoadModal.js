import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Divider,
  Heading,
  Select
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { TRM } from "../../app/utils/destinationUtils";
import DestinationTable from "../DestinationTable/destinationTable";
import { getFreeLoadTypes } from "../../app/utils/freeLoadUtils";

const FreeLoadModal = ({ isOpen, initialValue, readOnly, onSave, onClose }) => {
  const [freeLoad, setFreeLoad] = useState({
    id: "",
    patent: "",
    type: "",
    weight: "",
    guide: "",
    destinations: [],
  });

  useEffect(() => {
    const fetchInitialData = () => {
      if (initialValue) {
        setFreeLoad(initialValue);
      }
    };

    fetchInitialData();
  }, []);

  const handleSave = () => {
    onSave(freeLoad);
    onClose();
  };

  const onInputChange = (e) => {
    setFreeLoad({ ...freeLoad, [e.target.name]: e.target.value });
  };

  const toggleRepackage = () => {
    setFreeLoad({ ...freeLoad, repackage: !freeLoad.repackage });
  };

  const addDestinationRow = () => {
    const newDestinationId = Date.now();
    const newDestination = {
      id: newDestinationId,
      type: "",
      code: "",
      fob: "",
      currency: "",
      product_details: "",
    };

    setFreeLoad({
      ...freeLoad,
      destinations: [...freeLoad.destinations, newDestination],
    });
  };

  const handleDestinationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDestinations = [...freeLoad.destinations];

    if (name === "type" && value !== TRM) {
      updatedDestinations[index] = {
        ...updatedDestinations[index],
        [name]: value,
        fob: "",
        currency: "",
        product_details: "",
      };
    } else {
      updatedDestinations[index] = {
        ...updatedDestinations[index],
        [name]: value,
      };
    }

    setFreeLoad({ ...freeLoad, destinations: updatedDestinations });
  };

  const deleteDestinationRow = (index) => {
    const updatedDestinations = [...freeLoad.destinations];
    updatedDestinations.splice(index, 1);
    setFreeLoad({ ...freeLoad, destinations: updatedDestinations });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="90vw">
        {initialValue ? (
          <ModalHeader>Editar carga suelta</ModalHeader>
        ) : (
          <ModalHeader>Nueva carga suelta</ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <div className="data">
            <div className="item">
              <Heading as="h6" size="sm">
                Patente
              </Heading>
              <Input
                size="sm"
                placeholder="Patente"
                name="patent"
                value={freeLoad?.patent}
                onChange={onInputChange}
                isDisabled={readOnly}
              />
            </div>
            <div className="item">
              <Heading as="h6" size="sm">
                Tipo
              </Heading>
              <Select
                size="sm"
                placeholder="Tipo"
                name="type"
                value={freeLoad?.type}
                onChange={onInputChange}
                isDisabled={readOnly}
              >
                {getFreeLoadTypes().map((flt) => (
                  <option key={flt} value={flt}>
                    {flt}
                  </option>
                ))}
              </Select>
            </div>
            <div className="item">
              <Heading as="h6" size="sm">
                Peso
              </Heading>
              <Input
                size="sm"
                placeholder="Peso"
                name="weight"
                value={freeLoad?.weight}
                onChange={onInputChange}
                isDisabled={readOnly}
              />
            </div>
            <div className="item">
              <Heading as="h6" size="sm">
                Guía
              </Heading>
              <Input
                size="sm"
                placeholder="Guía"
                name="guide"
                value={freeLoad?.guide}
                onChange={onInputChange}
                isDisabled={readOnly}
              />
            </div>
          </div>
          <Divider />
          <div className="table-heading">
            <Heading className="second-heading" as="h6" size="sm">
              Destinaciones
            </Heading>
            <Button size="sm" colorScheme="green" onClick={addDestinationRow}>
              <AddIcon />
              Agregar
            </Button>
          </div>
          {/* Use the DestinationTable component here */}
          <DestinationTable
            destinations={freeLoad.destinations}
            onDestinationChange={handleDestinationChange}
            onDeleteDestination={deleteDestinationRow}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FreeLoadModal;
