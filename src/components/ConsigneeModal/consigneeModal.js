import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";

const ConsigneeModal = ({isOpen, onSave, onClose}) => {
  const [consignee, setConsignee] = useState({
    name: "",
    cuit: "",
  });

  const handleSave = async () => {
    await onSave(consignee);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Consignatario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Form fields for creating a new Consignatario */}
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={consignee.name}
              onChange={(e) => setConsignee({...consignee, name: e.target.value})}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>CUIT</FormLabel>
            <Input
              type="text"
              name="cuit"
              value={consignee.cuit}
              onChange={(e) => setConsignee({...consignee, cuit: e.target.value})}
            />
          </FormControl>
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

export default ConsigneeModal;