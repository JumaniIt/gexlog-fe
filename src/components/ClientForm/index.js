import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
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
import { useNavigate, useParams } from "react-router-dom";
import { withSession } from "../../app/utils/sessionUtils";
import { ERROR, SUCCESS } from "../../app/utils/alertUtils";

const ClientForm = ({ showAlert, setBlurLoading }) => {
  const { id } = useParams();
  const [client, setClient] = useState({
    name: "",
    phone: "",
    cuit: "",
    user_id: "",
  });
  const [userOptions, setUserOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  const handleSave = async () => {
    await withSession(
      navigate,
      async () => {
        setLoading(true);
        setError(null);

        let response;
        if (id) {
          response = await updateClient(id, client);
        } else {
          response = await saveClient(client);
        }

        if (response._isError) {
          showAlert(ERROR, response.code, response.message);
        } else {
          setClient(response);
          navigate("/clients/" + response.id, { replace: true });
          showAlert(SUCCESS, "Cliente guardado");
        }
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setBlurLoading(true);

      await withSession(navigate, async () => {
        let clientUserId;
        if (id) {
          const client = await getClientById(id);

          if (client._isError) {
            showAlert(ERROR, client.code, client.message);
          } else {
            clientUserId = client.user_id;
            setClient(client);
          }
        }

        const options = await searchUsers({
          page_size: 100,
          admin: "false",
          with_client: "false",
        });

        if (options._isError) {
          showAlert(ERROR, options.code, options.message);
        } else {
          const users = options.elements;
          if (id && clientUserId) {
            const user = await getUserById(clientUserId);
            if (user._isError) {
              showAlert(ERROR, user.code, user.message);
            } else {
              setUserOptions([...users, user]);
            }
          } else {
            setUserOptions(users);
          }
        }
      });
      setBlurLoading(false);
    };

    fetchInitialData();
  }, []);

  return (
    <div className="client-form-container">
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
    </div>
  );
};

export default ClientForm;
