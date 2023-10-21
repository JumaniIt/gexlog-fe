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
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { PRIV, TRM, toString } from "../../app/utils/destinationUtils";
import DestinationTable from "../DestinationTable/destinationTable";
import { getFreeLoadTypes } from "../../app/utils/freeLoadUtils";
import { Select as FilteredSelect } from "chakra-react-select";

const FreeLoadModal = ({
  isOpen,
  initialValue,
  readOnly,
  onSave,
  onClose,
  initialDestinations = [],
}) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState({});
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

      setDestinations([...initialDestinations]);
    };

    fetchInitialData();
  }, []);

  const validate = () => {
    const updatedDestinations = freeLoad.destinations.map((destination) => {
      // Check if the destination has a code attribute defined and its length is not 16
      const _isInvalid = destination.type !== PRIV && destination.code && destination.code.length !== 16;

      // Update the destination with the validation status
      return {
        ...destination,
        _isInvalid,
      };
    });

    // Update the container with the validated destinations
    setFreeLoad({ ...freeLoad, destinations: updatedDestinations });

    const hasInvalidDestination = updatedDestinations.some(
      (destination) => destination._isInvalid
    );

    // Return true if there are no invalid destinations, otherwise return false
    return !hasInvalidDestination;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(freeLoad);
      onClose();
    }
  };

  const onInputChange = (e) => {
    setFreeLoad({ ...freeLoad, [e.target.name]: e.target.value });
  };

  const addDestinationRow = () => {
    const newDestinationId = Date.now();
    let newDestination = {
      id: newDestinationId,
    };

    if (selectedDestination) {
      newDestination = {
        ...newDestination,
        type: selectedDestination.type,
        code: selectedDestination.code,
        fob: selectedDestination.fob,
        currency: selectedDestination.currency,
        product_details: selectedDestination.product_details,
      };
    } else {
      newDestination = {
        ...newDestination,
        type: "",
        code: "",
        fob: "",
        currency: "",
        product_details: "",
      };
    }

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
        _isInvalid: false,
      };
    } else {
      updatedDestinations[index] = {
        ...updatedDestinations[index],
        [name]: value,
        _isInvalid: false,
      };
    }

    if (name === "type" && value === PRIV) {
      updatedDestinations[index] = {
        ...updatedDestinations[index],
        code: "-",
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
      <ModalContent maxW="90vw" className="free-load-modal">
        {initialValue ? (
          <ModalHeader>Editar carga suelta</ModalHeader>
        ) : (
          <ModalHeader>Nueva carga suelta</ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <div className="data">
            <div className="row">
              <div className="patent-input">
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
              <div className="type-select">
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
              <div className="guide-input">
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
              <div className="weight-input">
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
            </div>
          </div>
          <Divider className="Divider" />
          <div className="table-heading">
            <Heading className="second-heading" as="h6" size="sm">
              Destinaciones
            </Heading>
            <div className="row destinations-select-row">
              <FilteredSelect
                size="sm"
                useBasicStyles={true}
                name="destinations-select"
                isReadOnly={readOnly}
                value={
                  selectedDestination?.code && {
                    label: toString(selectedDestination),
                    value: selectedDestination,
                  }
                }
                onChange={(e) => setSelectedDestination(e.value)}
                options={destinations
                  .filter((d) => d.code)
                  .map((d) => ({
                    label: toString(d),
                    value: d,
                  }))}
                selectedOptionStyle="color"
                className="filtered-select"
                placeholder="Puedes seleccionar y agregar una destinación anterior"
              />
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
          </div>
        </ModalBody>
        <ModalFooter className="footer">
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
