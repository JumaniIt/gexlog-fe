import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
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
import { MdEdit, MdDelete } from "react-icons/md";

const Note = ({ id, author, date, content, editable, onEdit, onDelete }) => {

  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="sm">
          {toLocalDateString(date)} - {translateAuthor(author)}
        </Heading>
        <div>
          <div>
            <Button
              isDisabled={!editable}
              onClick={() => onEdit(id)}
              variant="ghost"
            >
              <MdEdit size={20} />
            </Button>
            <Button
              isDisabled={!editable}
              onClick={() => onDelete(id)}
              variant="ghost"
            >
              <MdDelete size={20} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="2">
          <Box>
            <Text pt="2" fontSize="md">
              {content}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Note;
