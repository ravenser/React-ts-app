import { createContext, useEffect, useState } from 'react'

import './App.css'
import { faArchive, faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Note } from './model.tsx'
import NoteComponent from './componetns/NoteComponent.tsx'
import { NoteProvider, useNoteContext } from './componetns/AllNotesContext.tsx'
import NotesList from './componetns/NotesList.tsx'
interface NoteContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function App() {
  const { handleNoteAdd } = useNoteContext();
  
  return (
    <>
      <div className='main'>
      <table className='table'>
        <thead className='header_table'>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th className='icon-cell'> </th>
            <th className='icon-cell'> <FontAwesomeIcon icon={faArchive} className="header__icon" /></th>
            <th className='icon-cell'> <FontAwesomeIcon icon={faTrash} className="header__icon" /></th>
          </tr>
        </thead>
        <tbody>  
          <NotesList></NotesList>
        </tbody>
      </table>
      <div className='div-between'>
        <button className='button-between' onClick={handleNoteAdd}>
        Create Note</button>
      </div>
      <table className='table'>
        <thead className='table-header'>
            <tr>
                <th></th>
                <th>Note Category</th>
                <th>Active</th>
                <th>Archived</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  
    </>
  )
}

export default App
