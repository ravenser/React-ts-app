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
import "./style.css";
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
    <tr className="table_row">
      <td>
        {!isEditing && (
          <FontAwesomeIcon
            icon={allNotes[index].icon}
            className="category_icon"
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
                {category.value}
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
      <td className="cell_icon">
        {!isEditing && (
          <button className="row_button" onClick={EditNote}>
            {<FontAwesomeIcon icon={faPencilAlt} className="row_icon" />}
          </button>
        )}
        {isEditing && (
          <button className="row_button" onClick={FinishEditNote}>
            {<FontAwesomeIcon icon={faCheck} className="row_icon" />}
          </button>
        )}
      </td>
      <td className="cell_icon">
        <button className="row_button">
          <FontAwesomeIcon
            icon={faArchive}
            className="row_icon"
            onClick={() => {
              moveToArchive(index);
            }}
          />
        </button>
      </td>
      <td className="cell_icon">
        <button
          className="row_button"
          onClick={() => {
            deleteNote(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="row_icon" />
        </button>
      </td>
    </tr>
  );
};

export default NoteComponent;
