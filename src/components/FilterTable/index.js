import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { MdSearch, MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";

const mock = [
  { Solicitud: 1234 },
  { Solicitud: 5678 },
  { Solicitud: 9876 },
  { Solicitud: 5432 },
  { Solicitud: 2345 },
  { Solicitud: 6789 },
  { Solicitud: 8765 },
  { Solicitud: 4321 },
  { Solicitud: 3456 },
  { Solicitud: 7890 }
];

const FilterTable = () => {
  return (
    <div className="filter-table-container">
      <div className="filter-bar">
        <Select size='sm' placeholder='Cliente'></Select>
        <Input size='sm' placeholder='Legajo' />
        <input className='chakra-input css-1xt0hpo' type="date" />
        <input className='chakra-input css-1xt0hpo' type="time" />
        <Checkbox>PEMA</Checkbox>
        <Checkbox>G. PTO</Checkbox>
        <Checkbox>TTE</Checkbox>
        <Select size='sm' placeholder='Estado'></Select>
        <Button size='sm'> <MdSearch />Buscar</Button>
      </div>
      <div className="results-table">
        <TableContainer>
          <Table variant='striped' size='sm'>
            <Thead>
              <Tr>
                <Th>Solicitud</Th>
                <Th>Legajo</Th>
                <Th>Cliente</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>PEMA</Th>
                <Th>G. PTO</Th>
                <Th>TTE</Th>
                <Th>Origen</Th>
                <Th>Dest.</Th>
                <Th>Estado</Th>
                <Th>Ver</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mock.map((i) => {
                return (<Tr className='table-row'>
                  <Td>{i.Solicitud}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <Link to={`./order/${i.Solicitud}`}>
                      <MdOutlineOpenInNew />
                    </Link>
                  </Td>
                </Tr>)
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default FilterTable;