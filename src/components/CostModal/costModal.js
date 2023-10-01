import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  SimpleGrid,
  Button,
  Text,
  Spinner
} from "@chakra-ui/react";
import { withSession, getCurrentUser } from "../../app/utils/sessionUtils";
import {
  getCosts,
  updateCost,
  addCost,
  deleteCost, // Import createNote function
} from "../../app/services/orderService";
import { useNavigate } from "react-router-dom";
import EditableCost from "../Cost/editableCost";
import Cost from "../Cost/cost";
import { ERROR, SUCCESS } from "../../app/utils/alertUtils";

const CostModal = ({ isOpen, onClose, orderId, showAlert }) => {
  const [loading, setLoading] = useState(false);
  const [costs, setCosts] = useState([]);
  const [editedCostId, setEditCostId] = useState(null);
  const [isAddingCost, setIsAddingCost] = useState(false);

  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await withSession(navigate, async () => {
        const response = await getCosts(orderId, { page_size: 200 });
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          const orderedCosts = response.elements.sort((a, b) =>
            b.created_at.localeCompare(a.created_at)
          );

          setCosts(orderedCosts);
        }
      });
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  const handleDelete = async (costId) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar este costo?\nEsta acción es irreversible!`
    );

    if (confirmed) {
      await withSession(navigate, async () => {
        const response = await deleteCost(orderId, costId);
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setCosts((prevCosts) =>
            prevCosts.filter((cost) => cost.id !== costId)
          );
          showAlert(SUCCESS, "Costo eliminado");
        }
      });
    }
  };

  const handleEdit = (costId) => {
    setEditCostId(costId);
  };

  const handleCancelEdit = () => {
    setEditCostId(null);
    setIsAddingCost(false);
  };

  const handleSaveEdit = async (editedCost) => {
    await withSession(navigate, async () => {
      const updatedCost = await updateCost(orderId, editedCost.id, editedCost);
      if (updatedCost._isError) {
        showAlert(ERROR, updatedCost.code, updatedCost.message);
      } else {
        setCosts((prevCosts) =>
          prevCosts.map((cost) =>
            cost.id === updatedCost.id ? updatedCost : cost
          )
        );
        showAlert(SUCCESS, "Costo guardado");
      }
    });

    setEditCostId(null);
  };

  const handleAddCost = () => {
    setIsAddingCost(true);
  };

  const handleSaveNew = async (newCost) => {
    await withSession(navigate, async () => {
      const savedCost = await addCost(orderId, newCost);
      if (savedCost._isError) {
        showAlert(ERROR, savedCost.code, savedCost.message);
      } else {
        const updatedCosts = [savedCost, ...costs];

        setCosts(updatedCosts);

        showAlert(SUCCESS, "Costo guardado");
      }
    });

    setIsAddingCost(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className="cost-modal-content">
        <ModalHeader>Costos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="options-row">
            {!editedCostId && !isAddingCost && currentUser?.admin && (
              <Box>
                <Button size="sm" onClick={handleAddCost} colorScheme="green">
                  + Añadir
                </Button>
              </Box>
            )}
            <Box>
              <Text as="b">
                Total: ${costs.reduce((total, cost) => total + cost.amount, 0)}
              </Text>
            </Box>
          </div>

          <SimpleGrid columns={1} spacing={4}>
            {isAddingCost && currentUser?.admin && (
              <EditableCost
                onCancel={handleCancelEdit}
                onSave={handleSaveNew}
              />
            )}
            {costs.map((cost) => (
              <Box key={cost.id}>
                {editedCostId === cost.id ? (
                  <EditableCost
                    initialValue={cost}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                  />
                ) : (
                  <Cost
                    id={cost.id}
                    type={cost.type}
                    date={cost.created_at}
                    description={cost.description}
                    amount={cost.amount}
                    onDelete={() => handleDelete(cost.id)}
                    onEdit={handleEdit}
                    editable={currentUser?.admin}
                  />
                )}
              </Box>
            ))}
          </SimpleGrid>
          {loading && (
            <div className="spinner">
              <Spinner
                className="spinner"
                size="lg"
                color="blue.500"
                thickness="2px"
              />
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CostModal;
