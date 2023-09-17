import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  search as searchUsers,
  getById as getUserById,
} from "../../app/services/userService";
import { getIdAndName } from "../../app/utils/userUtils";
import {
  getById as getClientById,
  save as saveClient,
  update as updateClient,
} from "../../app/services/clientService";

const ClientForm = ({ id }) => {
  const [client, setClient] = useState({
    name: "",
    phone: "",
    cuit: "",
    user_id: "",
  });
  const [userOptions, setUserOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (id) {
        response = await updateClient(id, client);
      } else {
        response = await saveClient(client);
      }

      console.log("response " + JSON.stringify(response))

      if (response?.error) {
        setError(response.error.message);
      }

    } catch (err) {
      console.log("err ", err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      let clientUserId;
      if (id) {
        try {
          const client = await getClientById(id);
          clientUserId = client.user_id
          setClient(client);
        } catch (error) {
          console.error("Error fetching client:", error);
        }
      }

      try {
        const options = await searchUsers({
          page_size: 100,
          admin: "false",
          with_client: "false",
        });

        const users = options.elements;
        if (id && clientUserId) {
          const user = await getUserById(clientUserId);
          setUserOptions([...users, user]);
        } else {
          setUserOptions(users);
        }
      } catch (error) {
        console.error("Error fetching user options: ", error);
      }
    };
    
    fetchInitialData();
  }, []);

  return (
    <VStack spacing={4}>
      {(id && (
        <Text fontSize="xl" fontWeight="bold">
          {"Editar cliente #" + id}
        </Text>
      )) || (
        <Text fontSize="xl" fontWeight="bold">
          Nuevo cliente
        </Text>
      )}
      <FormControl isRequired mt={10}>
        <FormLabel>Nombre</FormLabel>
        <Input
          type="text"
          name="name"
          value={client.name}
          onChange={handleInputChange}
          placeholder="Nombre"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Teléfono</FormLabel>
        <Input
          type="text"
          name="phone"
          value={client.phone}
          onChange={handleInputChange}
          placeholder="Teléfono"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>CUIT</FormLabel>
        <Input
          type="number"
          name="cuit"
          value={client.cuit}
          onChange={handleInputChange}
          placeholder="CUIT"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Usuario</FormLabel>
        <Select
          name="user_id"
          value={client.user_id}
          onChange={handleInputChange}
          placeholder="Usuario"
        >
          {userOptions.map((user) => (
            <option key={user.id} value={user.id}>
              {getIdAndName(user)}
            </option>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Box color="red.500" fontWeight="semibold">
          {error}
        </Box>
      )}
      <Button
        colorScheme="teal"
        size="md"
        isLoading={loading}
        loadingText="Guardando..."
        onClick={handleSave}
      >
        Guardar
      </Button>
    </VStack>
  );
};

export default ClientForm;
