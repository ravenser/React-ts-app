import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNoteContext } from "./AllNotesContext";
import FormatDate from "./FormatDate";
import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
interface NoteComponentProps {
  index: number;
}
const NoteComponent: React.FC<NoteComponentProps> = ({ index }) => {
  const { archiveNotes, deleteNotefromArchive, moveFromArchive } =
    useNoteContext();
  return (
    <tr className="table-row">
      <td>
        <FontAwesomeIcon
          icon={archiveNotes[index].icon}
          className="category-icon"
        />
      </td>
      <td>
        <h2 className="name">{archiveNotes[index].name}</h2>
      </td>
      <td>
        <FormatDate date={archiveNotes[index].created} />
      </td>
      <td>
        <p>{archiveNotes[index].category}</p>
      </td>
      <td>
        <p>{archiveNotes[index].content}</p>
      </td>
      <td>{archiveNotes[index].dates}</td>
      <td className="icon-cell">
        <button className="button-row">
          <FontAwesomeIcon
            icon={faArchive}
            className="icon-row"
            onClick={() => {
              moveFromArchive(index);
            }}
          />
        </button>
      </td>
      <td className="icon-cell">
        <button
          className="button-row"
          onClick={() => {
            deleteNotefromArchive(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="icon-row" />
        </button>
      </td>
    </tr>
  );
};

export default NoteComponent;
