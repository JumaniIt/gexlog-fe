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
  Checkbox,
  Select,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { TRM, toString } from "../../app/utils/destinationUtils";
import DestinationTable from "../DestinationTable/destinationTable";
import { getContainerTypes } from "../../app/utils/containerUtils";
import { Select as FilteredSelect, CreatableSelect } from "chakra-react-select";

const ContainerModal = ({
  isOpen,
  initialValue,
  readOnly,
  onSave,
  onClose,
  defaultBl,
  initialBls = [],
  initialDestinations = [],
}) => {
  const [container, setContainer] = useState({
    id: "",
    code: "",
    type: "",
    bl: "",
    repackage: false,
    destinations: [],
  });
  const [bls, setBls] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState({});

  useEffect(() => {
    const fetchInitialData = () => {
      if (initialValue) {
        setContainer(initialValue);
      } else {
        const bl = initialBls.reduce((last, current) => current, null);
        setContainer({ ...container, bl });
      }

      setBls([...initialBls]);
      setDestinations([...initialDestinations]);
    };

    fetchInitialData();
  }, []);

  // TODO implement me
  const validate = () => {
    const updatedDestinations = container.destinations.map((destination) => {
      // Check if the destination has a code attribute defined and its length is not 16
      const _isInvalid = destination.code && destination.code.length !== 16;

      // Update the destination with the validation status
      return {
        ...destination,
        _isInvalid,
      };
    });

    // Update the container with the validated destinations
    setContainer({ ...container, destinations: updatedDestinations });

    const hasInvalidDestination = updatedDestinations.some(
      (destination) => destination._isInvalid
    );

    // Return true if there are no invalid destinations, otherwise return false
    return !hasInvalidDestination;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(container);
      onClose();
    }
  };

  const onInputChange = (e) => {
    setContainer({ ...container, [e.target.name]: e.target.value });
  };

  const toggleRepackage = () => {
    setContainer({ ...container, repackage: !container.repackage });
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

    setContainer({
      ...container,
      destinations: [...container.destinations, newDestination],
    });
  };

  const handleDestinationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDestinations = [...container.destinations];

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

    setContainer({ ...container, destinations: updatedDestinations });
  };

  const deleteDestinationRow = (index) => {
    const updatedDestinations = [...container.destinations];
    updatedDestinations.splice(index, 1);
    setContainer({ ...container, destinations: updatedDestinations });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="90vw" className="container-modal">
        {initialValue ? (
          <ModalHeader>Editar contenedor</ModalHeader>
        ) : (
          <ModalHeader>Nuevo contenedor</ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <div className="data">
            <div className="row">
              <div className="code-input">
                <Heading as="h6" size="sm">
                  Código
                </Heading>
                <Input
                  size="sm"
                  placeholder="Código"
                  name="code"
                  value={container?.code}
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
                  value={container?.type}
                  onChange={onInputChange}
                  isDisabled={readOnly}
                >
                  {getContainerTypes().map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="bl-select">
                <Heading as="h6" size="sm">
                  BL
                </Heading>
                <CreatableSelect
                  size="sm"
                  useBasicStyles={true}
                  placeholder={"BL"}
                  name="bl"
                  isReadOnly={readOnly}
                  value={{
                    label: container?.bl,
                    value: container?.bl,
                  }}
                  onChange={(e) => setContainer({ ...container, bl: e.value })}
                  options={bls.map((bl) => ({
                    label: bl,
                    value: bl,
                  }))}
                  selectedOptionStyle="color"
                />
              </div>
              <div className="repackage-checkbox">
                <Checkbox
                  isChecked={container.repackage}
                  onChange={toggleRepackage}
                  isDisabled={readOnly}
                >
                  Reenvase
                </Checkbox>
              </div>
            </div>

            <Divider className="Divider" />
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
              destinations={container.destinations}
              onDestinationChange={handleDestinationChange}
              onDeleteDestination={deleteDestinationRow}
              className="destinations-table"
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

export default ContainerModal;
