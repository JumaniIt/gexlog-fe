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
import { TRM } from "../../app/utils/destinationUtils";
import DestinationTable from "../DestinationTable/destinationTable";
import { getContainerTypes } from "../../app/utils/containerUtils";
import { CreatableSelect } from "chakra-react-select";

const ContainerModal = ({
  isOpen,
  initialValue,
  readOnly,
  onSave,
  onClose,
  initialBls = [],
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

  useEffect(() => {
    const fetchInitialData = () => {
      if (initialValue) {
        setContainer(initialValue);
      }

      setBls([...initialBls]);
    };

    fetchInitialData();
  }, []);

  const handleSave = () => {
    onSave(container);
    onClose();
  };

  const onInputChange = (e) => {
    setContainer({ ...container, [e.target.name]: e.target.value });
  };

  const toggleRepackage = () => {
    setContainer({ ...container, repackage: !container.repackage });
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
      };
    } else {
      updatedDestinations[index] = {
        ...updatedDestinations[index],
        [name]: value,
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
      <ModalContent maxW="90vw">
        {initialValue ? (
          <ModalHeader>Editar contenedor</ModalHeader>
        ) : (
          <ModalHeader>Nuevo contenedor</ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <div className="data">
            <div className="item">
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
            <div className="item">
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
            <div className="item">
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
                onChange={(e) => setContainer({...container, bl: e.value})}
                options={bls.map((bl) => ({
                  label: bl,
                  value: bl,
                }))}
                selectedOptionStyle="color"
              />
            </div>
            <div className="item">
              <Heading as="h6" size="sm">
                Reenvase
              </Heading>
              <Checkbox
                isChecked={container.repackage}
                onChange={toggleRepackage}
                isDisabled={readOnly}
              >
                Reenvase
              </Checkbox>
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
            destinations={container.destinations}
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

export default ContainerModal;
