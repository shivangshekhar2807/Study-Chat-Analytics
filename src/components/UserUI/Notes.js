import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ShowNotes from './ShowNotes';

function Notes() {

  const notestitleref = useRef();
  const contentref = useRef();
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');
  const [addmynotes, setaddmynotes] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editNote, setEditNote] = useState({});

  useEffect(() => {
    if (isEdit) {
      notestitleref.current.value = editNote.title;
      contentref.current.value = editNote.content;
    } else {
      notestitleref.current.value = '';
      contentref.current.value = '';
    }
  }, [isEdit, editNote]);


  async function updateNoteHandler(event) {
    event.preventDefault();

    const title = notestitleref.current.value.trim();
    const content = contentref.current.value.trim();

    if (title === '' || content === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(
        `https://movies-e-commerce-default-rtdb.firebaseio.com/Mynotes/${cleanedemail}/${editNote.id}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      notestitleref.current.value = '';
      contentref.current.value = '';
      setEditNote({});
      setIsEdit(false);
      setaddmynotes(Math.random());
    } catch (error) {
      alert(error.message);
    }
  }

  
  async function submitnotehandler(event) {
   event.preventDefault();
    const title = notestitleref.current.value.trim();
    const content = contentref.current.value.trim();

    if (title === '' || content === '') {
      alert('Please fill in both title and content.');
      return;
    }

    

    try {
      const response = await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/Mynotes/${cleanedemail}.json`, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          content: content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to post note');
      }

      // Clear the inputs
      notestitleref.current.value = '';
      contentref.current.value = '';

      setaddmynotes(Math.random());
    } catch (error) {
      alert('Error saving note: ' + error.message);
    } 
 }



  return (
    <div className="p-4" style={{ backgroundColor: '#343434', color: '#f0e6d2', minHeight: '100vh' }}>
      <h2 className="mb-4 text-warning">📒 Add Note</h2>

      <form className="p-4 rounded" style={{ backgroundColor: '#4b4b4b', border: '1px solid #c19a6b' }} onSubmit={submitnotehandler}>
        
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label">Title</label>
          <input 
            ref={notestitleref}
            type="text" 
            className="form-control bg-dark text-light border-warning" 
            id="noteTitle" 
            placeholder="Enter note title" 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="noteContent" className="form-label">Content</label>
          <textarea 
            ref={contentref}
            className="form-control bg-dark text-light border-warning" 
            id="noteContent" 
            rows="5" 
            placeholder="Write your note here..."
          ></textarea>
        </div>

        {!isEdit && <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }}>
          ➕ Save Note
        </button>}
        {isEdit && <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }} onClick={updateNoteHandler}>
          ➕ Update
        </button>}
      </form>
      <ShowNotes addmynotes={addmynotes} setIsEdit={setIsEdit} setEditNote={setEditNote}></ShowNotes>
    </div>
  );
}

export default Notes;