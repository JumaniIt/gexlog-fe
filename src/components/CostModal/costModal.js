import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Box,
  SimpleGrid,
  Checkbox,
  Button,
  Text,
} from "@chakra-ui/react";
import Note from "../Note/note";
import { withSession, getCurrentUser } from "../../app/utils/sessionUtils";
import {
  deleteNote,
  getNotes,
  updateNote,
  createNote,
  addNote,
  getCosts,
  updateCost,
  addCost,
  deleteCost, // Import createNote function
} from "../../app/services/orderService";
import { useNavigate } from "react-router-dom";
import { ADMIN, CLIENT } from "../../app/utils/noteUtils";
import EditableNote from "../Note/editableNote";
import EditableCost from "../Cost/editableCost";
import Cost from "../Cost/cost";

const CostModal = ({ isOpen, onClose, orderId, showAlert }) => {
  const [costs, setCosts] = useState([]);
  const [editedCostId, setEditCostId] = useState(null);
  const [isAddingCost, setIsAddingCost] = useState(false);

  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  useEffect(() => {
    const fetchInitialData = async () => {
      await withSession(
        navigate,
        async () => {
          const response = await getCosts(orderId, { page_size: 200 });
          const orderedCosts = response.elements.sort((a, b) =>
            b.created_at.localeCompare(a.created_at)
          );

          setCosts(orderedCosts);
        },
        (error) => console.log(error)
      );
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
        if (!response) {
          setCosts((prevCosts) =>
            prevCosts.filter((cost) => cost.id !== costId)
          );
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
      setCosts((prevCosts) =>
        prevCosts.map((cost) =>
          cost.id === updatedCost.id ? updatedCost : cost
        )
      );
    });

    setEditCostId(null);
  };

  const handleAddCost = () => {
    setIsAddingCost(true);
  };

  const handleSaveNew = async (newCost) => {
    await withSession(navigate, async () => {
      const savedCost = await addCost(orderId, newCost);

      const updatedCosts = [savedCost, ...costs];

      setCosts(updatedCosts);
    });

    setIsAddingCost(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Costos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <SimpleGrid columns={2} spacing={4}>
              <Box>
                <Text as="b">
                  Total: $
                  {costs.reduce((total, cost) => total + cost.amount, 0)}
                </Text>
              </Box>
              {!isAddingCost && currentUser?.admin && (
                <Box>
                  <Button onClick={handleAddCost} colorScheme="teal">
                    + Añadir
                  </Button>
                </Box>
              )}
            </SimpleGrid>

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
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CostModal;
