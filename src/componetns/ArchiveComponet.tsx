import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNoteContext } from "./AllNotesContext";
import FormatDate from "./FormatDate";
import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import DateExtractor from "./DateExtractor";
interface NoteComponentProps {
  index: number;
}
const NoteComponent: React.FC<NoteComponentProps> = ({ index }) => {
  const { archiveNotes, deleteNotefromArchive, moveFromArchive } =
    useNoteContext();
  return (
    <tr className="archive_table_row">
      <td>
        <FontAwesomeIcon
          icon={archiveNotes[index].icon}
          className="category_icon"
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
      <td>{DateExtractor(archiveNotes[index].content).join(" ")}</td>
      <td className="cell_icon">
        <button className="row_button">
          <FontAwesomeIcon
            icon={faArchive}
            className="row_icon"
            onClick={() => {
              moveFromArchive(index);
            }}
          />
        </button>
      </td>
      <td className="cell_icon">
        <button
          className="row_button"
          onClick={() => {
            deleteNotefromArchive(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="row_icon" />
        </button>
      </td>
    </tr>
  );
};

export default NoteComponent;
