import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import ClientForm from "../ClientForm";

const NewClientModal = ({
  isOpen,
  onClose,
  setBlurLoading,
  showAlert,
  afterSave,
}) => {
  useEffect(() => {
    const fetchInitialData = async () => {};
    fetchInitialData();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className="note-modal-content">
        <ModalCloseButton />
        <ModalBody>
          <ClientForm
            setBlurLoading={setBlurLoading}
            showAlert={showAlert}
            afterSave={(newClient) => {
              afterSave(newClient);
              onClose();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewClientModal;
