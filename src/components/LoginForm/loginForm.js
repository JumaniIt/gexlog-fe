import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import logo from "../../gexlog-logo.svg";
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await login(email, password);

    if (loginResponse?.message) {
      setErrorMessage(loginResponse.message);
    } else {
      navigate("/requests", { replace: true });
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-logo">
        <img src={logo} alt="gexlog" />
        <h1 className="logo-name">Gexlog</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <FormControl id="email" isRequired mt={10}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="text"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleEmailChange}
            size="lg"
          />
        </FormControl>
        <FormControl id="password" isRequired mt={8}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            size="lg"
          />
        </FormControl>
        <Button className="button" type="submit" w="100%" mt={10}>
          Iniciar sesión
        </Button>
        {errorMessage && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
