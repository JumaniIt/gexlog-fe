import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationFooter = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5; // Maximum number of visible page buttons
  const pages = [];

  // Calculate the range of pages to display based on the current page
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // Ensure that we have maxVisiblePages pages if totalPages is smaller
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  // Add "Anterior" button
  if (currentPage > 1) {
    pages.push(
      <Button
        key="previous"
        variant="link"
        onClick={() => onPageChange(currentPage - 1)}
        leftIcon={<FaChevronLeft />}
      >
        Anterior
      </Button>
    );
  }

  // Add "..." before page numbers if necessary
  if (startPage > 1) {
    pages.push(
      <Text key="previousEllipsis" as="b" color="gray">
        ...
      </Text>
    );
  }

  // Add page numbers
  for (let page = startPage; page <= endPage; page++) {
    pages.push(
      <Button
        key={page}
        variant="link"
        onClick={() => {
          if (currentPage !== page) onPageChange(page);
        }}
        colorScheme={currentPage === page ? "blue" : "gray"}
      >
        {page}
      </Button>
    );
  }

  // Add "..." after page numbers if necessary
  if (endPage < totalPages) {
    pages.push(
      <Text key="nextEllipsis" as="b" color="gray">
        ...
      </Text>
    );
  }

  // Add "Siguiente" button
  if (currentPage < totalPages) {
    pages.push(
      <Button
        key="next"
        variant="link"
        onClick={() => onPageChange(currentPage + 1)}
        rightIcon={<FaChevronRight />}
      >
        Siguiente
      </Button>
    );
  }

  return (
    <HStack justifyContent="center" mt={4}>
      {pages}
    </HStack>
  );
};

export default PaginationFooter;
