import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import logo from "../../full-logo.png";
import { login } from "../../app/services/loginService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
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

    hideErrorMessage();
    setSubmitting(true);

    const loginResponse = await login(email, password);
    
    setSubmitting(false);

    if (loginResponse?.message) {
      setErrorMessage(loginResponse.message);
    } else {
      navigate("/orders", { replace: true });
    }
  };

  const hideErrorMessage = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    if (errorMessage) {
      const errorTimeout = setTimeout(hideErrorMessage, 5000);
      return () => clearTimeout(errorTimeout);
    }
  }, [errorMessage]);

  return (
    <div className="login-form-container">
      <div className="login-logo">
        <img src={logo} alt="gexlog" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <FormControl id="email" isRequired mt={10}>
          <FormLabel>E-mail</FormLabel>
          <Input
            type="text"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleEmailChange}
            size="md"
          />
        </FormControl>
        <FormControl id="password" isRequired mt={6}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
            size="md"
          />
        </FormControl>
        <Button className="button" type="submit" w="100%" mt={8} isLoading={submitting}>
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
