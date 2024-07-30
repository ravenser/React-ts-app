import "./App.css";
import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNoteContext } from "./componetns/AllNotesContext.tsx";
import NotesList from "./componetns/NotesList.tsx";
import { useState } from "react";
import ArchiveList from "./componetns/ArcviveList.tsx";

function App() {
  const { noteAdd } = useNoteContext();
  const [isArchiveVisible, setIsArchiveVisible] = useState<boolean>(false);
  const toggleArchive = (): void => {
    setIsArchiveVisible(!isArchiveVisible);
  };

  return (
    <>
      <div className="main">
        <div>
          <table className="table">
            <thead className="header_table">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Created</th>
                <th>Category</th>
                <th>Content</th>
                <th>Dates</th>
                <th className="icon-cell"> </th>
                <th className="icon-cell">
                  {" "}
                  <FontAwesomeIcon icon={faArchive} className="header__icon" />
                </th>
                <th className="icon-cell">
                  {" "}
                  <FontAwesomeIcon icon={faTrash} className="header__icon" />
                </th>
              </tr>
            </thead>
            <tbody>
              <NotesList></NotesList>
            </tbody>
          </table>
        </div>
        <div className="middle-div">
          <button className="create-button" onClick={noteAdd}>
            Create Note
          </button>
          <button className="archive-button" onClick={toggleArchive}>
            Archive
          </button>
        </div>
        {isArchiveVisible && (
          <div>
            <table>
              <tbody>
                <ArchiveList />
              </tbody>
            </table>
          </div>
        )}
        <table className="table">
          <thead className="table-header">
            <tr>
              <th></th>
              <th>Note Category</th>
              <th>Active</th>
              <th>Archived</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}

export default App;
