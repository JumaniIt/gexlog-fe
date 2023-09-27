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
  Input,
} from "@chakra-ui/react";

const ConsigneeModal = ({ isOpen, onSave, onClose }) => {
  const [consignee, setConsignee] = useState({
    name: "",
    cuit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave(consignee);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo consignatario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Form fields for creating a new Consignatario */}
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={consignee.name}
              onChange={(e) =>
                setConsignee({ ...consignee, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>CUIT</FormLabel>
            <Input
              type="text"
              name="cuit"
              value={consignee.cuit}
              onChange={(e) =>
                setConsignee({ ...consignee, cuit: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave} isLoading={loading}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConsigneeModal;
