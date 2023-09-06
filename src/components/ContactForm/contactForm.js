import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Flex,
  FormControl,
  Input,
  Select,
  Textarea,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Heading,
  Text,
} from "@chakra-ui/react";

import { sendEmail } from "../../app/services/emailService";

const ContactForm = ({ className }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [messageError, setMessageError] = useState("");

  // on submission
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const CREATE_USER_OPTION = "Quiero un usuario";

  const validate = () => {
    let isValid = true;

    if (!name) {
      isValid = false;
      setNameError("Campo requerido");
    } else {
      setNameError("");
    }

    if (!email) {
      isValid = false;
      setEmailError("Campo requerido");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }

    if (!phone) {
      isValid = false;
      setPhoneError("Campo requerido");
    } else {
      setPhoneError("");
    }

    if (!reason) {
      isValid = false;
      setReasonError("Campo requerido");
    } else {
      setReasonError("");
    }

    if (reason !== CREATE_USER_OPTION && !message) {
      isValid = false;
      setMessageError("Campo requerido");
    } else {
      setMessageError("");
    }

    return isValid;
  };

  const onClick = async () => {
    hideSuccessMessage();
    hideErrorMessage();
    if (!validate()) {
      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);
    const subject = "[Landing] " + reason;
    let body = `
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone}
        Motivo de consulta: ${reason}
    `;

    if (message) {
      body += `
        Consulta:
        ${message}
      `;
    }

    const error = await sendEmail(subject, body);
    if (error === undefined) {
      setSuccessMessage("Consulta enviada");
    } else {
      setErrorMessage("Ha ocurrido un error");
    }

    setSubmitting(false);
  };

  const handleReasonChange = (e) => {
    const selectedReason = e.target.value;
    setReason(selectedReason);
    setReasonError("");
  };

  const hideSuccessMessage = () => {
    setSuccessMessage("");
  };

  const hideErrorMessage = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    if (successMessage) {
      const successTimeout = setTimeout(hideSuccessMessage, 5000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(successTimeout);
    }

    if (errorMessage) {
      const errorTimeout = setTimeout(hideErrorMessage, 5000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(errorTimeout);
    }
  }, [successMessage, errorMessage]);

  return (
    <Card className="contact-form">
      <CardBody>
        <Flex Flex direction="column" alignItems="center">
          <Heading as="h2" size="lg" mb={4}>
            Contactanos
          </Heading>
          <Text mb={6} fontSize="md">
            ¿Cómo podemos ayudarte?
          </Text>
        </Flex>
        <FormControl className={className} isRequired isInvalid={!!nameError}>
          <Input
            placeholder="Nombre"
            value={name}
            size="sm"
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
          />
          <FormErrorMessage>{nameError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!emailError}>
          <Input
            type="email"
            size="sm"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!phoneError}>
          <Input
            placeholder="Teléfono"
            size="sm"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
          />
          <FormErrorMessage>{phoneError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!reasonError}>
          <Select
            placeholder="Motivo de consulta"
            size="sm"
            value={reason}
            onChange={handleReasonChange}
          >
            <option>{CREATE_USER_OPTION}</option>
            <option>Tengo una pregunta</option>
          </Select>
          <FormErrorMessage>{reasonError}</FormErrorMessage>
        </FormControl>
        <FormControl
          className={className}
          isRequired
          isInvalid={!!messageError}
        >
          <Textarea
            placeholder="Escribí acá tu consulta..."
            value={message}
            size="sm"
            onChange={(e) => {
              setMessage(e.target.value);
              setMessageError("");
            }}
          />
          <FormErrorMessage>{messageError}</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          type="button"
          colorScheme="blue"
          onClick={onClick}
          isLoading={submitting}
          loadingText="Enviando"
        >
          Enviar
        </Button>
        {successMessage && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </CardBody>
    </Card>
  );
};

export default ContactForm;
