import React, { createContext, ReactNode, useContext, useState } from "react";
import { Note } from "../model";
import {
  faCartShopping,
  faLightbulb,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Category {
  value: string;
  label: React.ReactNode;
}

interface AllNoteContextType {
  allNotes: Note[];
  noteAdd: () => void;
  deleteNote: (index: number) => void;
  deleteNotefromArchive: (index: number) => void;
  editNotes: (index: number, updatedNote: Partial<Note>) => void;
  archiveNotes: Note[];
  moveToArchive: (index: number) => void;
  moveFromArchive: (index: number) => void;
  categories: Category[];
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
      content: "Tomatoes, bread, 22/04/2004, 03/12/2011",
    },
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread, 04:22:2009",
    },
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread",
    },
    {
      icon: faCartShopping,
      name: "Shopping list",
      created: new Date(),
      category: "Task",
      content: "Tomatoes, bread",
    },
  ]);
  const [archiveNotes, setArciveNotes] = useState<Note[]>([]);

  const noteAdd = () => {
    const emptyNote: Note = {
      icon: faCartShopping,
      name: "",
      created: new Date(),
      category: "",
      content: "",
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

  function moveToArchive(index: number): void {
    setNotes((prevNotes) => {
      const noteToArchive = prevNotes[index];
      setArciveNotes((prevArchived) => [...prevArchived, noteToArchive]);
      return prevNotes.filter((_, i) => i !== index);
    });
  }

  const moveFromArchive = (index: number): void => {
    setArciveNotes((prevArchived) => {
      const [noteToArchive] = prevArchived.splice(index, 1);
      setNotes((prevNotes) => [...prevNotes, noteToArchive]);
      return [...prevArchived];
    });
  };

  const categories: Category[] = [
    {
      value: "Task",
      label: (
        <FontAwesomeIcon icon={faCartShopping} className="category_icon" />
      ),
    },
    {
      value: "Random Thought",
      label: <FontAwesomeIcon icon={faQuoteLeft} className="category_icon" />,
    },
    {
      value: "Idea",
      label: <FontAwesomeIcon icon={faLightbulb} className="category_icon" />,
    },
  ];

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
        categories,
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
