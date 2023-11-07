import React, { useRef, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { toLocalDateTimeString } from "../../app/utils/dateUtils";
import { translateAuthor } from "../../app/utils/noteUtils";

const NotePreview = ({ notes, showSystemNotes }) => {
  const containerRef = useRef(null);

  return (
    <div style={{ maxHeight: "400px", overflowY: "scroll" }} ref={containerRef}>
      <SimpleGrid columns={1} spacing={4}>
        <Box
          className="note-box"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          {notes
            .filter((note) => showSystemNotes || note.author !== "SYSTEM")
            .map((note) => {
              const date = new Date(note.created_at);
              const title = `${translateAuthor(
                note.author
              )} - ${toLocalDateTimeString(date)}`;
              return (
                <Box
                  className={
                    note.author === "ADMIN"
                      ? "admin-note-box"
                      : note.author === "SYSTEM"
                      ? "system-note-box"
                      : "user-note-box"
                  }
                  maxW="sm"
                  borderWidth="0px"
                  overflow="hidden"
                >
                  <div className="box-content">
                    <Box color="gray.500" fontWeight="semibold" mt="2">
                      {title}
                    </Box>
                    <Box>{note.content}</Box>
                  </div>
                </Box>
              );
            })}
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default NotePreview;
