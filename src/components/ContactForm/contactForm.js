import React, { useState } from "react";
import { FormControl } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

const ContactForm = ({ className }) => {

  return (
    <Card className="contact-form">
      <CardBody>
        <FormControl className={className} isRequired>
          <Input placeholder="Nombre" />
        </FormControl>
        <FormControl className={className} isRequired>
          <Input type="email" placeholder="Email" />
        </FormControl>
        <FormControl className={className} isRequired>
          <Input placeholder="Teléfono" />
        </FormControl>
        <FormControl className={className} isRequired>
          <Select placeholder="Motivo de consulta">
            <option>Quiero un usuario</option>
            <option>Tengo una consulta</option>
          </Select>
        </FormControl>
        <FormControl className={className} isRequired>
          <Textarea placeholder="Escribí acá tu consulta..." />
        </FormControl>
        <Button mt={4} type="submit" colorScheme="blue">
          Enviar
        </Button>
      </CardBody>
    </Card>
  );
};

export default ContactForm;
