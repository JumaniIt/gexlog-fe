import React from "react";
import Layout from "../../components/Layout";
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Divider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react'
import { MdKeyboardBackspace } from "react-icons/md";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { MdMoreVert } from "react-icons/md";

const ExpandButton = () => <Menu>
  <MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<MdMoreVert />}
    variant='outline'
  />
  <MenuList>
    <MenuItem /* icon={<AddIcon />} */ >
      Editar
    </MenuItem>
    <MenuItem /* icon={<ExternalLinkIcon />} */>
      Eliminar
    </MenuItem>
  </MenuList>
</Menu>

const Order = ({

}) => {


  return (
    <Layout className="order-container" headingText={`< Volver`}>
      <Card variant="outline" className="order-card">
        <CardHeader className="order-card-header">
          <Heading size='sm' className="order-heading">Solicitud #1234 / </Heading>
          <Input variant='flushed' placeholder='Legajo' size="sm" />
        </CardHeader>
        <Divider className="order-divider" />
        <CardBody>
          <div className="top-row">
            <div className="services">
              <Heading as='h6' size='xs'>Servicios</Heading>
              <Stack spacing={5} direction='row'>
                <Checkbox className="services-checkbox">
                  PEMA
                </Checkbox>
                <Checkbox className="services-checkbox">
                  G. PTO
                </Checkbox>
                <Checkbox className="services-checkbox">
                  TTE
                </Checkbox>
              </Stack>
            </div>
            <div className="extra">
              <Checkbox className="services-checkbox">
                Carga suelta
              </Checkbox>
            </div>
          </div>

          <Divider variant="dashed" />

          <div className="main-content">
            <div className="left-column">
              <div className="first-row">
                <Heading as='h6' size='sm'>Cliente</Heading>
                <Stack spacing={3}>
                  <Select size="sm" placeholder='Cliente'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <Select size="sm" placeholder='Factura a'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                </Stack>
              </div>
              <div className="second-row">
                <div className="title">
                  <Heading as='h6' size='sm'>Documentación</Heading>
                  <IconButton icon={<AddIcon />} size="xs" className="add-doc-icon" />
                </div>
              </div>
            </div>
            <div className="right-column">
              <div className="first-row">
                <Heading as='h6' size='sm'>Datos de servicio</Heading>
                <Stack spacing={3} className="first-row-stack">
                  <Select size="sm" placeholder='Cliente'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <Select size="sm" placeholder='Factura a'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <Select size="sm" placeholder='Origen'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <Select size="sm" placeholder='Destino'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                </Stack>
              </div>
              <div className="second-row">
                <Grid
                  templateColumns='repeat(2, 1fr)'
                  gap={4}
                >
                  <GridItem>
                    <Heading as='h6' size='sm'>Transporte</Heading>
                    <Grid
                      templateRows='repeat(3, 1fr)'
                      gap={4}
                    >
                      <GridItem colSpan={2}>
                        <Input size="sm" placeholder='Nombre' />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Input size="sm" placeholder='Teléfono' />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Input size="sm" placeholder='Chasis' />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Input size="sm" placeholder='Semi' />
                      </GridItem>
                      <GridItem colSpan={4}>
                        <Input size="sm" placeholder='Empresa' />
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Heading as='h6' size='sm'>Comisionista</Heading>
                    <Grid gap={4}>
                      <GridItem>
                        <Input size="sm" placeholder='Nombre' />
                      </GridItem>
                      <GridItem>
                        <Input size="sm" placeholder='Teléfono' />
                      </GridItem>
                    </Grid>
                  </GridItem>
                </Grid>
              </div>
              <div className="third-row">
                <Heading as='h6' size='sm'>Contenedores</Heading>
                <div className="subtitle">
                  <Input size="sm" placeholder='PEMA' />
                  <Button size='xs'>+ Añadir</Button>
                </div>
                <TableContainer>
                  <Table size='sm' variant="striped">
                    <Thead>
                      <Tr>
                        <Th>Código</Th>
                        <Th>Tipo</Th>
                        <Th>BL</Th>
                        <Th>Destinación</Th>
                        <Th>Reenvase</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>CAIU6774460</Td>
                        <Td>CAIU6774460</Td>
                        <Td>CAIU6774460</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>25.4</Td>
                        <Td><ExpandButton /></Td>
                      </Tr>
                      <Tr>
                        <Td>CAIU6774460</Td>
                        <Td>CAIU6774460</Td>
                        <Td>CAIU6774460</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>25.4</Td>
                        <Td><ExpandButton /></Td>
                      </Tr>
                      <Tr>
                        <Td>CAIU6774460</Td>
                        <Td>CAIU6774460</Td>
                        <Td>CAIU6774460</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>25.4</Td>
                        <Td><ExpandButton /></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Layout>
  )
};

export default Order;
