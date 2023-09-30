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
  Button, // Import Button component for "Add" button
} from "@chakra-ui/react";
import Note from "../Note/note";
import { withSession, getCurrentUser } from "../../app/utils/sessionUtils";
import {
  deleteNote,
  getNotes,
  updateNote,
  addNote,
} from "../../app/services/orderService";
import { useNavigate } from "react-router-dom";
import { ADMIN, CLIENT } from "../../app/utils/noteUtils";
import EditableNote from "../Note/editableNote";
import { ERROR, SUCCESS } from "../../app/utils/alertUtils";

const NoteModal = ({ isOpen, onClose, orderId, showAlert }) => {
  const [notes, setNotes] = useState([]);
  const [editedNoteId, setEditedNoteId] = useState(null);
  const [showSystemNotes, setShowSystemNotes] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  useEffect(() => {
    const fetchInitialData = async () => {
      await withSession(navigate, async () => {
        const response = await getNotes(orderId, { page_size: 200 });
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          const orderedNotes = response.elements.sort((a, b) =>
            b.created_at.localeCompare(a.created_at)
          );

          setNotes(orderedNotes);
        }
      });
    };

    fetchInitialData();
  }, []);

  const handleDelete = async (noteId) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar esta nota?\nEsta acción es irreversible!`
    );

    if (confirmed) {
      await withSession(navigate, async () => {
        const response = await deleteNote(orderId, noteId);
        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== noteId)
          );
          showAlert(SUCCESS, "Nota eliminada");
        }
      });
    }
  };

  const handleEdit = (noteId) => {
    setEditedNoteId(noteId);
  };

  const handleCancelEdit = () => {
    setEditedNoteId(null);
    setIsAddingNote(false); // Cancel adding a new note
  };

  const handleSaveEdit = async (editedNote) => {
    await withSession(navigate, async () => {
      const updatedNote = await updateNote(orderId, editedNote.id, editedNote);
      if (updatedNote._isError) {
        showAlert(ERROR, updateNote.code, updateNote.message);
      } else {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )
        );
        showAlert(SUCCESS, "Nota guardada");
      }
    });

    setEditedNoteId(null);
  };

  const handleAddNote = () => {
    setIsAddingNote(true);
  };

  const handleSaveNew = async (newNote) => {
    await withSession(navigate, async () => {
      const savedNote = await addNote(orderId, newNote);
      if (savedNote._isError) {
        showAlert(ERROR, savedNote.code, savedNote.message);
      } else {
        const updatedNotes = [savedNote, ...notes];

        setNotes(updatedNotes);
        showAlert(SUCCESS, "Nota guardada");
      }
    });

    setIsAddingNote(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentUser?.admin && (
            <Checkbox
              isChecked={showSystemNotes}
              onChange={() => setShowSystemNotes((prev) => !prev)}
            >
              Mostrar notas de sistema
            </Checkbox>
          )}
          <VStack align="stretch" spacing={4}>
            <SimpleGrid columns={1} spacing={4}>
              <Box>
                {!isAddingNote && (
                  <Button onClick={handleAddNote} colorScheme="teal">
                    + Añadir
                  </Button>
                )}
              </Box>
              {isAddingNote && (
                <EditableNote
                  onCancel={handleCancelEdit}
                  onSave={handleSaveNew}
                />
              )}

              {notes
                .filter((note) => showSystemNotes || note.author !== "SYSTEM")
                .map((note) => (
                  <Box key={note.id}>
                    {editedNoteId === note.id ? (
                      <EditableNote
                        initialValue={note}
                        onCancel={handleCancelEdit}
                        onSave={handleSaveEdit}
                      />
                    ) : (
                      <Note
                        id={note.id}
                        author={note.author}
                        date={note.created_at}
                        content={note.content}
                        onDelete={() => handleDelete(note.id)}
                        onEdit={handleEdit}
                        editable={
                          note.author === CLIENT ||
                          (note.author === ADMIN && currentUser?.admin)
                        }
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

export default NoteModal;