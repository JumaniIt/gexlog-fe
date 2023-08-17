import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'

const CardSection = ({ title, cardContent }) => {
  return (
    <div className="card-section">
      <Heading size='2xl' className="card-section--heading">{title}</Heading>
      <div className='card-section--cards-container'>
        {cardContent.map((content, index) => (
          <Card className="card-section--card" align="center" variant="outline" key={index}>
            <CardHeader className='card-header'>
              <div dangerouslySetInnerHTML={{ __html: content?.icon }} />
              <Heading size='lg' color="gray.700">{content.title}</Heading>
            </CardHeader>
            <Divider />
            <CardBody className='card-body'>
              <List spacing={content?.bullets?.length < 5 ? 6 : 4} className="cards--bullet-list">
                {content?.bullets?.map((bullet, index) => (
                  <ListItem  color="gray.600" key={index} fontSize='lg'>
                    <ListIcon as={CheckIcon} color="blue.500" />
                    {bullet}
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardSection;