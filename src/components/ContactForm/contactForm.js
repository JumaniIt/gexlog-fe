import React, { useState } from "react";
import {
  Card,
  CardBody,
  FormControl,
  Input,
  Select,
  Textarea,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const ContactForm = ({ className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [messageError, setMessageError] = useState('');

  // on submission
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const validate = () => {
    let isValid = true;

    if (!name) {
      isValid = false;
      setNameError('Campo requerido');
    } else {
      setNameError('');
    }

    if (!email) {
      isValid = false;
      setEmailError('Campo requerido');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }

    if (!phone) {
      isValid = false;
      setPhoneError('Campo requerido');
    } else {
      setPhoneError('');
    }

    if (!reason) {
      isValid = false;
      setReasonError('Campo requerido');
    } else {
      setReasonError('');
    }


    if (reason !== "Quiero un usuario" && !message) {
      isValid = false;
      setMessageError('Campo requerido');
    } else {
      setMessageError('');
    }

    return isValid;
  };

  const onClick = async () => {
    setSuccessMessage('')
    setErrorMessage('')
  	if (!validate()) {
      return;
    }

    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);
      const subject = '[SISTEMA - Landing] ' + reason;
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

      const response = await fetch('http://gexlog-be.us-east-2.elasticbeanstalk.com/internal/send-email', {
        method: 'POST',
        headers: {
          'x-auth-origin': 'gexlog-fe',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          body
        })
      });

      if (response.status === 204) {
        setSuccessMessage('Consulta enviada');
      } else {
        setErrorMessage('Ha ocurrido un error');
        const errorData = await response.json() // TODO show error notification
        if (response.status === 400) {
          console.error('Client side error:', errorData);
        } else {
          console.log('Server side error:', errorData);
        } 
      }

    } catch (error) {
      setErrorMessage('Ha ocurrido un error');
      console.error('Internal error:', error);

    } finally {
      setSubmitting(false);
    }
  };

  const handleReasonChange = (e) => {
    const selectedReason = e.target.value;
    setReason(selectedReason);
    setReasonError('');
  };


  return (
    <Card className="contact-form">
      <CardBody>
        <FormControl className={className} isRequired isInvalid={!!nameError}>
          <Input
            placeholder="Nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setNameError('')
            }}
          />
          <FormErrorMessage>{nameError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!emailError}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError('')
            }}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!phoneError}>
          <Input
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setPhoneError('')
            }}
          />
          <FormErrorMessage>{phoneError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!reasonError}>
          <Select
            placeholder="Motivo de consulta"
            value={reason}
            onChange={handleReasonChange}
          >
            <option>Quiero un usuario</option>
            <option>Tengo una pregunta</option>
          </Select>
          <FormErrorMessage>{reasonError}</FormErrorMessage>
        </FormControl>
        <FormControl className={className} isRequired isInvalid={!!messageError}>
          <Textarea
            placeholder="Escribí acá tu consulta..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setMessageError('')
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
