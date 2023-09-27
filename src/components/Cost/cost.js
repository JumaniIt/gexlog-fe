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
import { MdEdit, MdDelete } from "react-icons/md";
import { translateCostType } from "../../app/utils/costUtils";

const Cost = ({
  id,
  date,
  type,
  description,
  amount,
  editable,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="sm">
          {toLocalDateString(date)} - {translateCostType(type)} - ${amount}
        </Heading>
        {editable && (
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
        )}
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="2">
          <Box>
            <Text pt="2" fontSize="md">
              {description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Cost;
