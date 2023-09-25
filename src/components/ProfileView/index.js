import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";
import { MdCreate } from "react-icons/md";
import { Divider } from '@chakra-ui/react'

const ProfileView = () => {
  return (
    <>
      <div className="data">
        <div className="item">
          <Heading as="h6" size="sm">Nickname</Heading>
          <Text fontSize="sm">blabla</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">E-mail</Heading>
          <Text fontSize="sm">blabla</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">Nombre</Heading>
          <Text fontSize="sm">blabla</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">Teléfono</Heading>
          <Text fontSize="sm">blabla</Text>
        </div>
        <div className="item">
          <Heading as="h6" size="sm">CUIT</Heading>
          <Text fontSize="sm">blabla</Text>
        </div>
      </div>
      <Divider />
      <div className="table-heading">
        <Heading className="second-heading" as="h6" size="sm">Consignatarios</Heading>
        <Button size="xs" colorScheme="green">
          <MdCreate />
          Crear
        </Button>
      </div>
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>CUIT</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
};

export default ProfileView;
