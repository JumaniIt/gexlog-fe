import React from "react";
import { Button, HStack } from "@chakra-ui/react";

const PaginationFooter = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <HStack justifyContent="center" mt={4}>
      <Button
        isDisabled={totalPages <= 1 || currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </Button>
      {[...Array(totalPages).keys()].map((page) => (
        <Button
          key={page}
          onClick={() => {
            if (currentPage !== page + 1) {
              onPageChange(page + 1);
            }
          }}
          colorScheme={currentPage === page + 1 ? "blue" : "gray"}
        >
          {page + 1}
        </Button>
      ))}
      <Button
        isDisabled={totalPages <= 1 || currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </Button>
    </HStack>
  );
};

export default PaginationFooter;
