import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { generateReport } from "../../app/services/orderService";
import LabeledItem from "../LabeledItem";
import { withSession } from "../../app/utils/sessionUtils";
import { useNavigate } from "react-router-dom";
import { ERROR } from "../../app/utils/alertUtils";

const ReportModal = ({
  isOpen,
  onClose,
  showAlert,
  setBlurLoading,
  initial,
}) => {
  const [request, setRequest] = useState({
    date_from: initial.date_from,
    date_to: initial.date_to,
  });

  useEffect(() => {
    const reloadInitial = () => {
      setRequest({
        date_from: initial.date_from,
        date_to: initial.date_to,
      });
    };
    reloadInitial();
  }, [initial]);

  const navigate = useNavigate();

  const handleSave = async () => {
    onClose();
    setBlurLoading(true);
    await withSession(navigate, async () => {
      const response = await generateReport(request);
      try {
        console.log(response);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const currentMillis = new Date().getTime();
        a.download = "operaciones-" + currentMillis + ".csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
        showAlert(ERROR, "No se pudo descargar el reporte");
      }
    });
    setBlurLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reporte</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="report-options">
            <LabeledItem
              item={
                <input
                  className="chakra-input css-1xt0hpo"
                  type="date"
                  value={request?.date_from || ""}
                  onChange={(e) =>
                    setRequest({ ...request, date_from: e.target.value })
                  }
                />
              }
              label="Desde"
            />
            <LabeledItem
              item={
                <input
                  className="chakra-input css-1xt0hpo"
                  type="date"
                  value={request.date_to || ""}
                  onChange={(e) =>
                    setRequest({ ...request, date_to: e.target.value })
                  }
                />
              }
              label="Hasta"
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave} isDisabled={!request.date_from || !request.date_to}>
            Descargar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
