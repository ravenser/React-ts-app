import React from "react";
import { useNoteContext } from "./AllNotesContext.tsx"; // Adjust the import path
import NoteComponent from "./NoteComponent.tsx";

const NoteList: React.FC = () => {
  const { allNotes } = useNoteContext();

  return (
    <>
      {allNotes.map((_, index) => (
        <NoteComponent key={index} index={index}></NoteComponent>
      ))}
    </>
  );
};

export default NoteList;
