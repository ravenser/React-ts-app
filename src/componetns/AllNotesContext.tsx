import React, { createContext, ReactNode, useContext, useState } from "react";
import { Note } from "../model";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
interface AllNoteContextType {
  allNotes: Note[];
  noteAdd: () => void;
  deleteNote: (index: number) => void;
  deleteNotefromArchive: (index: number) => void;
  editNotes: (index: number, updatedNote: Partial<Note>) => void;
  archiveNotes: Note[];
  moveToArchive: (index: number) => void;
  moveFromArchive: (index: number) => void;
}
const AllNoteContext = createContext<AllNoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allNotes, setNotes] = useState<Note[]>([
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread",
      dates: "",
    },
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread",
      dates: "",
    },
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread",
      dates: "",
    },
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread",
      dates: "",
    },
  ]);
  const [archiveNotes, setArciveNotes] = useState<Note[]>([]);

  const noteAdd = () => {
    const emptyNote: Note = {
      icon: faCartShopping, // Example icon, you can replace this
      name: "",
      created: new Date(),
      category: "",
      content: "",
      dates: "",
    };
    setNotes((prevNotes) => [...prevNotes, emptyNote]);
  };

  const deleteNote = (index: number) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  const deleteNotefromArchive = (index: number) => {
    setArciveNotes((prevArchiveNotes) =>
      prevArchiveNotes.filter((_, i) => i !== index),
    );
  };

  const editNotes = (index: number, updatedNote: Partial<Note>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === index ? { ...note, ...updatedNote } : note,
      ),
    );
  };
  const moveToArchive = (index: number): void => {
    setNotes((prevNotes) => {
      console.log(index);
      const [noteToArchive] = prevNotes.splice(index, 1);
      setArciveNotes((prevArchived) => [...prevArchived, noteToArchive]);
      return [...prevNotes];
    });
  };
  const moveFromArchive = (index: number): void => {
    setArciveNotes((prevArchived) => {
      const [noteToArchive] = prevArchived.splice(index, 1);
      setNotes((prevNotes) => [...prevNotes, noteToArchive]);
      return [...prevArchived];
    });
  };

  return (
    <AllNoteContext.Provider
      value={{
        allNotes,
        noteAdd,
        deleteNote,
        deleteNotefromArchive,
        editNotes,
        archiveNotes,
        moveToArchive,
        moveFromArchive,
      }}
    >
      {children}
    </AllNoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(AllNoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
