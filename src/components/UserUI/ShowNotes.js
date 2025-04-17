


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ShowNotes({ addmynotes,setIsEdit,setEditNote }) {
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');
  const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Delete, setDelete] = useState({});

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/Mynotes/${cleanedemail}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();

        const loadedNotes = [];
        for (const key in data) {
          loadedNotes.push({
            id: key,
            title: data[key].title,
            content: data[key].content,
          });
        }

        setNotes(loadedNotes);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
        setIsLoading(false);
      }
    }

    fetchNotes();
  }, [addmynotes,Delete]);

  const deleteNoteHandler = async (noteId) => {
   

    try {
      const response = await fetch(
        `https://movies-e-commerce-default-rtdb.firebaseio.com/Mynotes/${cleanedemail}/${noteId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
        setDelete(Math.random());
    
    } catch (error) {
      alert('Error deleting note: ' + error.message);
    }
  };
    
      const handleEdit = (note) => {
    setIsEdit(true);
    setEditNote(note);
  };

  return (
    <div className="p-4" style={{ backgroundColor: '#343434', color: '#f0e6d2', minHeight: '100vh' }}>
      <h2 className="mb-4 text-warning">🗂️ Your Notes</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {notes.map((note) => (
            
            <div className="col" key={note.id}>
              <div className="card h-100 text-dark" style={{ backgroundColor: '#f0e6d2', border: '1px solid #c19a6b' }}>
                <div className="card-body">
                  <h5 className="card-title text-uppercase" style={{ color: '#4b4b4b' }}>{note.title}</h5>
                  <p
                    className="card-text"
                    style={{
                      color: '#4b4b4b',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {note.content}
                  </p>                  
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }}
                    onClick={() => deleteNoteHandler(note.id)}
                  >
                    🗑️ Delete
                  </button>
                  {console.log("Note ID:", note.id)}
                <Link to={`/saved/${note.id}`}>  <button
                     className="btn btn-sm"
                    style={{ backgroundColor: '#6fb1fc', color: '#1c1c1c' }}
                     
                    >
                    👁️ View
                   </button>
                   </Link>
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: '#ffc107', color: '#1c1c1c' }}
                    onClick={() => handleEdit(note)}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowNotes;