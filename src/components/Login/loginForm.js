import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

import { login } from "../../app/services/loginService";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(email, password)

    if (response.user) {
      alert("Welcome " + response.user)
    } else {
      setErrorMessage(response.message)
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="l" mb={4}>
        Ingresar
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4} w="100%">
          Log In
        </Button>
        {errorMessage && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default LoginForm;