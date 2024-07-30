import { useState } from 'react'

import './App.css'

function App() {
  

  return (
    <>
      <div className='main'>
      <table className='table'>
        <thead className='table_header'>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th className='icon-cell'> </th>
            <th className='icon-cell'> <FontAwesomeIcon icon={faArchive} className="icon-header" /></th>
            <th className='icon-cell'> <FontAwesomeIcon icon={faTrash} className="icon-header" /></th>
          </tr>
        </thead>
        <tbody>  
          {notes.map((note, index)=> (
            <Note key = {index} note = {note} updateNote = {handleNoteChange} 
            deleteNote = {handleNoteDelete} id = {index}/>
          ))}
        </tbody>
      </table>
      <div className='div-between'>
        <button className='button-between' onClick={handleNoteAdd}>
        Create Note</button>
        <Archive></Archive>
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
          <Category></Category>
          <Category></Category>
          <Category></Category>
        </tbody>
      </table>
    </div>
  )
    </>
  )
}

export default App
