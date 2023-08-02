import React from 'react';
import {
  List,
  ListItem,
  ListIcon,
  UnorderedList,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react';
import { BsCheckLg } from "react-icons/bs";
import image from "../container.png";
const ImageText = ({ }) => {
  return (
    <div className="image-text image-text--content">
        <div className="image-text--top-list">
          <Heading color="blue.500" size="lg">
            Precintos satelitales
          </Heading>
          <Divider orientation='vertical' />
          <Heading color="blue.500" size="lg">
            Transportes
          </Heading>
          <Divider orientation='vertical' />
          <Heading color="blue.500" size="lg">
            Logística aduanera
          </Heading>
        </div>
        <Divider />
        <div className="image-text--bottom-list">
          <UnorderedList spacing={3} className="image-text--content__small left">
            <ListItem color="blackAlpha.600">
              Gestión de turnos y pagos en terminales portuarias
            </ListItem>
            <ListItem color="blackAlpha.600">
              Gestión en puerto
            </ListItem>
            <ListItem color="blackAlpha.600">
              Seguimiento de origen a destino
            </ListItem>
          </UnorderedList>
          <UnorderedList spacing={6} className="image-text--content__small right">
            <ListItem color="blackAlpha.600">
              Sistema de gestión especializado para los clientes
            </ListItem>
            <ListItem color="blackAlpha.600">
              Emisión de solicitudes aduaneras TRM/TLAT/TLMD, certificados de origen, reenvases, hojas de ruta, etc.
            </ListItem>
          </UnorderedList>
        </div>
      </div>
  );
};

export default ImageText;