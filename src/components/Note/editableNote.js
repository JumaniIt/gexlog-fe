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
} from "@chakra-ui/react";
import { toLocalDateString } from "../../app/utils/dateUtils";
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
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        {note.id && (
          <Heading size="sm">
            {toLocalDateString(note.created_at)} -{" "}
            {translateAuthor(note.author)}
          </Heading>
        )}

        <div>
          <div>
            <Button onClick={handleSave} variant="ghost" isLoading={loading}>
              <MdSave size={20} />
            </Button>
            <Button onClick={onCancel} variant="ghost">
              <MdCancel size={20} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="2">
          <Box>
            <Input
              pt="2"
              fontSize="md"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EditableNote;
