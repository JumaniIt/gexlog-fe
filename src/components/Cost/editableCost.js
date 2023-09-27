import React, { useState, useEffect } from "react";
import { Heading, Input, Select } from "@chakra-ui/react";
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
import { getCostTypes, translateCostType } from "../../app/utils/costUtils";

const EditableCost = ({ initialValue, onSave, onCancel }) => {
  const [cost, setCost] = useState({
    id: "",
    type: "",
    created_at: "",
    description: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = () => {
      if (initialValue) {
        setCost(initialValue);
      }
    };

    fetchInitialData();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    await onSave(cost);

    setLoading(false);
  };

  const onInputChange = (e) => {
    setCost({ ...cost, [e.target.name]: e.target.value });
  };

  return (
    <Card variant="filled">
      <CardHeader display="flex" justifyContent="space-between">
        <Select
          name="type"
          size="sm"
          placeholder="Tipo"
          value={cost.type}
          onChange={onInputChange}
        >
        {getCostTypes().map((ct) => (
          <option key={ct.value} value={ct.value}>
            {ct.translation}
          </option>
        ))}
        </Select>
        <Input
          name="amount"
          type="number"
          size="sm"
          placeholder="Monto"
          value={cost.amount}
          onChange={onInputChange}
        />
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
              placeholder="Descripción"
              value={cost.description}
              onChange={(e) =>
                setCost({ ...cost, description: e.target.value })
              }
            />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EditableCost;
