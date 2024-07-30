
import React, {createContext, ReactNode, useContext, useState} from "react";
import { Note } from "../model";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
interface AllNoteContextType {
    allNotes: Note[];
    handleNoteAdd: () => void;
    handleDeleteNote: (index: number) => void;
    editNotes: (index: number, updatedNote: Partial<Note>) => void;
  }
const AllNoteContext = createContext<AllNoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allNotes, setNotes] = useState<Note[]>([
        {
          'icon':faCartShopping,
          'name':'Shopping list',
          'created':new Date(),
          'category':'Task',
          'content':"Tomatoes, bread",
          'dates': ''
        },
        {
          'icon':faCartShopping,
          'name':'Shopping list',
          'created':new Date(),
          'category':'Task',
          'content':"Tomatoes, bread",
          'dates': ''
        },
        {
          'icon':faCartShopping,
          'name':'Shopping list',
          'created':new Date(),
          'category':'Task',
          'content':"Tomatoes, bread",
          'dates': ''
        },
        {
          'icon':faCartShopping,
          'name':'Shopping list',
          'created':new Date(),
          'category':'Task',
          'content':"Tomatoes, bread",
          'dates': ''
        }

    ]);
  
    const handleNoteAdd = () => {
        const emptyNote: Note = {
          icon: faCartShopping, // Example icon, you can replace this
          name: '',
          created: new Date(),
          category: '',
          content: '',
          dates: '',
        };
        setNotes(prevNotes => [...prevNotes, emptyNote]);
      };

      const handleDeleteNote = (index: number) => {
        setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
      };

      const editNotes = (index: number, updatedNote: Partial<Note>) => {
        setNotes(prevNotes =>
          prevNotes.map((note, i) => (i === index ? { ...note, ...updatedNote } : note))
        );
      };


    return (
      <AllNoteContext.Provider value={{ allNotes, handleNoteAdd, handleDeleteNote, editNotes }}>
        {children}
      </AllNoteContext.Provider>
    );
  };

  export const useNoteContext = () => {
    const context = useContext(AllNoteContext);
    if (context === undefined) {
      throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
  };