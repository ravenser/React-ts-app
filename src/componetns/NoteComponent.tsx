import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNoteContext } from "./AllNotesContext";
import FormatDate from "./FormatDate";
import {
  faArchive,
  faPencilAlt,
  faTrash,
  IconDefinition,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Note } from "../model";
import IconSelect from "./SelectIcon";
import DateExtractor from "./DateExtractor";

interface NoteComponentProps {
  index: number;
}
const NoteComponent: React.FC<NoteComponentProps> = ({ index }) => {
  const { allNotes, editNotes, deleteNote, moveToArchive, categories } =
    useNoteContext();
  const [isEditing, setisEditing] = useState<boolean>(false);
  const [noteIcon, setnoteIcon] = useState<IconDefinition>(
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
    setnoteIcon(allNotes[index].icon);
    setNoteName(allNotes[index].name);
    setSelectedCategory(allNotes[index].category);
    setNoteContent(allNotes[index].content);
  };
  const FinishEditNote = () => {
    const newNote: Note = {
      icon: noteIcon,
      name: noteName,
      category: selectedCategory,
      content: noteContent,
      created: allNotes[index].created,
    };
    editNotes(index, newNote);
    setisEditing(!isEditing);
  };
  const editName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value);
  };
  const editCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const editContentAndDates = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };
  return (
    <tr className="table-row">
      <td>
        {!isEditing && (
          <FontAwesomeIcon
            icon={allNotes[index].icon}
            className="category-icon"
          />
        )}
        {isEditing && (
          <IconSelect selectedIcon={noteIcon} onChange={setnoteIcon} />
        )}
      </td>
      <td>
        {!isEditing && <h2 className="name">{allNotes[index].name}</h2>}
        {isEditing && (
          <input type="text" value={noteName} onChange={editName}></input>
        )}
      </td>
      <td>
        <FormatDate date={allNotes[index].created} />
      </td>
      <td>
        {!isEditing && <p>{allNotes[index].category}</p>}
        {isEditing && (
          <select
            defaultValue={categories[0].value}
            value={selectedCategory}
            onChange={editCategory}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        )}
      </td>
      <td>
        {!isEditing && <p>{allNotes[index].content}</p>}
        {isEditing && (
          <textarea value={noteContent} onChange={editContentAndDates} />
        )}
      </td>
      <td>{DateExtractor(allNotes[index].content).join(" ")}</td>
      <td className="icon-cell">
        {!isEditing && (
          <button className="button-row" onClick={EditNote}>
            {<FontAwesomeIcon icon={faPencilAlt} className="icon-row" />}
          </button>
        )}
        {isEditing && (
          <button className="button-row" onClick={FinishEditNote}>
            {<FontAwesomeIcon icon={faCheck} className="icon-row" />}
          </button>
        )}
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
