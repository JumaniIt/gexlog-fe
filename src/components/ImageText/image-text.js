import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'

const ImageText = ({ title, text, itemsList, img }) => {
  return (
    <div className="image-text-section">
      <Heading size='2xl' className="image-text--heading">{title}</Heading>
      <div className='image-text--container'>
        <img src={img} className="image-text--image" />
        <div className='image-text--content'>
          <Text fontSize='xl' color="gray.600">{text}</Text>
          <List spacing={3} className="image-text--bullets-list">
            {itemsList?.map((item, index) => (
              <ListItem color="gray.600" key={index} fontSize='xl'>
                <ListIcon as={CheckIcon} color="blue.500" />
                {item}
              </ListItem>
            ))}
          </List>
          <Button className="image-text--button" size="lg" colorScheme='blue'>Solicitar usuario</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageText;