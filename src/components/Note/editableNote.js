import React, { useState, useEffect } from "react";
import { Heading, Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { toLocalDateTimeString } from "../../app/utils/dateUtils";
import { translateAuthor } from "../../app/utils/noteUtils";
import { MdSave, MdCancel } from "react-icons/md";

const EditableNote = ({ initialValue, onSave, onCancel }) => {
  const [note, setNote] = useState({
    id: "",
    author: "",
    created_at: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = () => {
      if (initialValue) {
        setNote(initialValue);
      }
    };

    fetchInitialData();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    await onSave(note);

    setLoading(false);
  };

  return (
    <Card variant="filled">
      <CardHeader>
        {note.id ? (
          <Heading size="sm">
            {toLocalDateTimeString(note.created_at)} -{" "}
            {translateAuthor(note.author)}
          </Heading>
        ) : (
          <Heading size="sm">
            Nueva nota
          </Heading>
        )}
      </CardHeader>
      <CardBody>
        <Stack spacing="2">
          <Box>
            <Textarea
              placeholder="Ingrese el contenido de la nota"
              fontSize="md"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </Box>
          <div>
            <Button onClick={handleSave} variant="ghost" isLoading={loading}>
              <MdSave size={20} />
            </Button>
            <Button onClick={onCancel} variant="ghost">
              <MdCancel size={20} />
            </Button>
          </div>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EditableNote;
