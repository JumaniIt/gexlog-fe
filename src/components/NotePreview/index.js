import React, { useRef, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { toLocalDateString } from "../../app/utils/dateUtils";

const NotePreview = ({ notes }) => {
  const containerRef = useRef(null);

  // Scroll to the end when the component mounts or when the notes change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [notes]);

  return (
    <div style={{ maxHeight: "200px", overflowY: "scroll" }} ref={containerRef}>
      <SimpleGrid columns={1} spacing={4}>
        <Box
          className="note-box"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          {notes
            .filter((note) => note.author !== "SYSTEM")
            .map((note) => {
              const date = new Date(note.created_at);
              const title = `${note.author === "ADMIN" ? "Admin" : "Cliente"} - ${toLocalDateString(date)}`
              return (
              <Box
                className={
                  note.author === "ADMIN" ? "admin-note-box" : "user-note-box"
                }
                maxW="sm"
                borderWidth="0px"
                overflow="hidden"
              >
                <div className="box-content">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    mt="2"
                  >
                    {title}
                  </Box>
                  <Box>{note.content}</Box>
                </div>
              </Box>
            )})}
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default NotePreview;
