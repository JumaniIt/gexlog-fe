import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Button,
} from "@chakra-ui/react";
import { statuses } from "../../app/services/orderService";

const StatusModal = ({ id, isOpen, onClose, onSave, currentStatus }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSave = async () => {
    onClose();
    await onSave(selectedOption);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        {id ? (
          <ModalHeader>{"Estado solicitud #" + id} </ModalHeader>
        ) : (
          <ModalHeader>{"Estado"} </ModalHeader>
        )}

        <ModalCloseButton />
        <ModalBody>
          <Select
            value={selectedOption || currentStatus}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {statuses.map((s) => {
              return (
                <option key={s.value} value={s.value}>
                  {s.translation}
                </option>
              );
            })}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StatusModal;
