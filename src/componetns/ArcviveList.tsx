import React from "react";
import { useNoteContext } from "./AllNotesContext.tsx"; // Adjust the import path
import ArchiveComponent from "./ArchiveComponet.tsx";

const ArchiveList: React.FC = () => {
  const { archiveNotes } = useNoteContext();

  return (
    <>
      {archiveNotes.map((_, index) => (
        <ArchiveComponent key={index} index={index}></ArchiveComponent>
      ))}
    </>
  );
};

export default ArchiveList;
