import React from 'react';
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'

const TextSection = ({ title, text, mail, number, sectionId }) => {
  return (
    <div className="text-section" id={sectionId}>
      <Heading size='xl' className="text-section--heading">{title}</Heading>
      <div className='text-section--container'>
        <Text fontSize='md' color="gray.600" className="main-text">{text}</Text>
        <Text fontSize='sm' color="gray.600"><EmailIcon className='text-section--icon' />{mail}</Text>
        <Text fontSize='sm' color="gray.600"><PhoneIcon className='text-section--icon' />{number}</Text>
      </div>
    </div>
  );
};

export default TextSection;