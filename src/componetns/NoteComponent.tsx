import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useNoteContext } from './AllNotesContext';
import FormatDate from './FormatDate';
import { faArchive, faPencilAlt, faTrash } from  "@fortawesome/free-solid-svg-icons";
import { Note } from '../model';
interface NoteComponentProps {
  index: number;
}
const NoteComponent: React.FC<NoteComponentProps> = ({ index }) => {
  const { allNotes,editNotes, handleDeleteNote } = useNoteContext()
  const [isEditing, setisEditing] = useState<boolean>(false);
  const handleEditNote=()=>{
    const newNote:Note = allNotes[index];
    editNotes(index, newNote)
  }
  return (
      <tr className='table-row'>
            <td>{!isEditing && 
                (<FontAwesomeIcon icon={allNotes[index].icon} 
                className='category-icon'/>)}
          </td>
            <td>
                {!isEditing && 
                (<h2 className='name'>
                    {allNotes[index].name}
                </h2>)}                
            </td>
            <td>
                <FormatDate date = {allNotes[index].created}/>
            </td>
            <td>
                {!isEditing && 
                (<p>{allNotes[index].category}</p>)}
                </td>
            <td>
                {!isEditing &&(
                <p>{allNotes[index].content}</p>)}
                </td>
            <td>
                {allNotes[index].dates}
            </td>
            <td className='icon-cell'>
                <button className='button-row' onClick={handleEditNote}>
                    <FontAwesomeIcon icon={faPencilAlt} className="icon-row" />
                </button></td>
            <td className='icon-cell'>
                <button className='button-row'>
                    <FontAwesomeIcon icon={faArchive} className="icon-row" />
                </button></td>
            <td className='icon-cell'>
                <button className='button-row' onClick={() =>{handleDeleteNote(index)}}>
                    <FontAwesomeIcon icon={faTrash} className="icon-row" />
                </button></td>
        </tr>
  )
}

export default NoteComponent
