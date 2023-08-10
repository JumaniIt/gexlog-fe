import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import {
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';


const CardSection = ({ className, cardContent }) => {
  return (
    <div className={className}>
      {cardContent?.map((card, index) => (
        <Card>
          <CardHeader>
            <Heading size='md'>{card.title}</Heading>
          </CardHeader>
          <CardBody>
            <Text>{card.description}</Text>
            {card?.bullets &&
              <UnorderedList spacing={3} className="cards--bullet-list">
                {card?.bullets?.map((bullet) => (
                  <ListItem color="blackAlpha.600">
                    {bullet}
                  </ListItem>
                ))}
              </UnorderedList>
            }
            <div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CardSection;