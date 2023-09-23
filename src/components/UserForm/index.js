import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  getById as getUserById,
  save as saveUser,
  update as updateUser,
} from "../../app/services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { withSession } from "../../app/utils/sessionUtils";

const UserForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    admin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      [name]: checked,
    });
  };

  const handleSave = async () => {
    withSession(
      navigate,
      async () => {
        setLoading(true);
        setError(null);

        let response;
        if (id) {
          response = await updateUser(id, user);
        } else {
          response = await saveUser(user);
        }

        if (response?.error) {
          setError(response.error.message);
        } else if (response?.message) {
          setError(response.message);
        } else {
          navigate("/users", { replace: true });
        }
      },
      (error) => setError(error.message),
      () => setLoading(false)
    );
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      withSession(
        navigate,
        async () => {
          if (id) {
            const user = await getUserById(id);
            setUser(user);
          }
        },
        (error) => console.error("Error fetching client:", error)
      );
    };

    fetchInitialData();
  }, []);

  return (
    <VStack spacing={4}>
      {(id && (
        <Text fontSize="xl" fontWeight="bold">
          {"Editar usuario #" + id}
        </Text>
      )) || (
        <Text fontSize="xl" fontWeight="bold">
          Nuevo usuario
        </Text>
      )}
      <FormControl isRequired mt={10}>
        <FormLabel>Nickname</FormLabel>
        <Input
          type="text"
          name="nickname"
          value={user.nickname}
          onChange={handleInputChange}
          placeholder="Nickname"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Contraseña</FormLabel>
        <Input
          type="text"
          name="password"
          placeholder="****"
          value={user.password}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <Checkbox
          name="admin"
          isChecked={user.admin}
          onChange={handleCheckChange}
          placeholder="Admin"
        >
          Admin
        </Checkbox>
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

export default UserForm;
