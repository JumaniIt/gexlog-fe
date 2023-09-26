import React, { useState } from "react";
import { Input, List, ListItem, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const FilterableSelect = ({
  options,
  initialValue,
  onSelect,
  placeholder,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOption = (option) => {
    console.log(option)
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div>
      <Input
        value={selectedOption || initialValue || ""}
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        size={size}
        style={{ width: "100%" }}
      />
      {isOpen && (
        <List
          position="absolute"
          zIndex="1"
          mt="2"
          border="1px solid #ccc"
          borderRadius="md"
          boxShadow="md"
          maxHeight="200px"
          overflowY="auto"
        >
          {filteredOptions.map((option) => (
            <ListItem
              key={option}
              cursor="pointer"
              p={2}
              _hover={{ background: "gray.100" }}
            >
              <Box as="div" onClick={() => handleSelectOption(option)}>
                {option}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default FilterableSelect;
