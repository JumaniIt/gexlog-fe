import React from 'react';
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
      <Heading size='xl' className="image-text--heading">{title}</Heading>
      <div className='image-text--container'>
        <img src={img} className="image-text--image"  alt="description"/>
        <div className='image-text--content'>
          <Text fontSize='md' color="gray.600">{text}</Text>
          <List spacing={2} className="image-text--bullets-list">
            {itemsList?.map((item, index) => (
              <ListItem color="gray.600" key={index} fontSize='md'>
                <ListIcon as={CheckIcon} color="blue.500" />
                {item}
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default ImageText;