import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNoteContext } from "./AllNotesContext";
import FormatDate from "./FormatDate";
import {
  faArchive,
  faPencilAlt,
  faTrash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Note } from "../model";
import IconSelect from "./SelectIcon";

interface NoteComponentProps {
  index: number;
}
const NoteComponent: React.FC<NoteComponentProps> = ({ index }) => {
  const { allNotes, editNotes, deleteNote, moveToArchive, categories } =
    useNoteContext();
  const [isEditing, setisEditing] = useState<boolean>(false);
  const [selectedIcon, setSelectedicon] = useState<IconDefinition>(
    allNotes[index].icon,
  );
  const [noteName, setNoteName] = useState<string>(allNotes[index].name);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    allNotes[index].category,
  );
  const [noteContent, setNoteContent] = useState<string>(
    allNotes[index].content,
  );

  const EditNote = () => {
    setisEditing(!isEditing);
    const newNote: Note = allNotes[index];
    editNotes(index, newNote);
  };
  const editName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value);
  };
  const editCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const editContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };
  return (
    <tr className="table-row">
      <td>
        {!isEditing && (
          <FontAwesomeIcon icon={selectedIcon} className="category-icon" />
        )}
        {isEditing && (
          <IconSelect selectedIcon={selectedIcon} onChange={setSelectedicon} />
        )}
      </td>
      <td>
        {!isEditing && <h2 className="name">{noteName}</h2>}
        {isEditing && (
          <input type="text" value={noteName} onChange={editName}></input>
        )}
      </td>
      <td>
        <FormatDate date={allNotes[index].created} />
      </td>
      <td>
        {!isEditing && <p>{selectedCategory}</p>}
        {isEditing && (
          <select value={selectedCategory} onChange={editCategory}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        )}
      </td>
      <td>
        {!isEditing && <p>{noteContent}</p>}
        {isEditing && <textarea value={noteContent} onChange={editContent} />}
      </td>
      <td>{allNotes[index].dates}</td>
      <td className="icon-cell">
        <button className="button-row" onClick={EditNote}>
          <FontAwesomeIcon icon={faPencilAlt} className="icon-row" />
        </button>
      </td>
      <td className="icon-cell">
        <button className="button-row">
          <FontAwesomeIcon
            icon={faArchive}
            className="icon-row"
            onClick={() => {
              moveToArchive(index);
            }}
          />
        </button>
      </td>
      <td className="icon-cell">
        <button
          className="button-row"
          onClick={() => {
            deleteNote(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="icon-row" />
        </button>
      </td>
    </tr>
  );
};

export default NoteComponent;
