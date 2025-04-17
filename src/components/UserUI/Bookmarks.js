import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ShowBookmarks from './ShowBookmarks';

function Bookmarks() {
 
    const email = useSelector((state) => state.Auth.email);
    const cleanedemail = email.replace(/[@.]/g, '_');
    const titleref = useRef();
    const descriptionref = useRef();
    const urlref = useRef();
    const [add, setAdd] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [editobj, setEditobj] = useState({});
    

   useEffect(() => {
  if (editobj && editobj.title && editobj.url && editobj.description) {
    titleref.current.value = editobj.title;
    urlref.current.value = editobj.url;
    descriptionref.current.value = editobj.description;
  } else {
    titleref.current.value = "";
    urlref.current.value = "";
    descriptionref.current.value = "";
  }
}, [editobj]);


    async function updatebookmarkhandler(event) {
  event.preventDefault();
  const title = titleref.current.value;
  const url = urlref.current.value;
  const description = descriptionref.current.value;

  if (title === '' || url === '' || description === '') {
    alert('Enter all the values');
    return;
  }

  try {
    const response = await fetch(
      `https://movies-e-commerce-default-rtdb.firebaseio.com/${cleanedemail}/bookmarks/${editobj.id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          url: url,
          description: description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update bookmark');
    }

    
    titleref.current.value = '';
    urlref.current.value = '';
    descriptionref.current.value = '';
    setEditobj({});
    setIsEdit(false);
    setAdd(Math.random()); 

  } catch (error) {
    alert(error.message);
  }
}
    
   async function addBookmarkhandler(event) {
  event.preventDefault();

  const title = titleref.current.value;
  const description = descriptionref.current.value;
  const url = urlref.current.value;

  const newBookmark = {
    title,
    description,
    url,
  };

  try {
    const response = await fetch(
      `https://movies-e-commerce-default-rtdb.firebaseio.com/${cleanedemail}/bookmarks.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookmark),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to add bookmark');
    }

   
    titleref.current.value = '';
    descriptionref.current.value = '';
    urlref.current.value = '';
      setAdd(Math.random());

    console.log('Bookmark added successfully!');
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
}


  return (
    <div className="p-4" style={{ backgroundColor: '#343434', color: '#f0e6d2', minHeight: '100vh' }}>
      <h2 className="mb-4 text-warning">🔖 Add Bookmark</h2>
      
      <form className="p-4 rounded" style={{ backgroundColor: '#4b4b4b', border: '1px solid #c19a6b' }} onSubmit={addBookmarkhandler}>
        
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            ref={titleref}
            type="text" 
            className="form-control bg-dark text-light border-warning" 
            id="title" 
            placeholder="Enter bookmark title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input 
             ref={descriptionref}
            type="text" 
            className="form-control bg-dark text-light border-warning" 
            id="description" 
            placeholder="Enter a short description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="form-label">URL</label>
          <input 
            ref={urlref}
            type="url" 
            className="form-control bg-dark text-light border-warning" 
            id="link" 
            placeholder="https://example.com"
          />
        </div>

              {!isEdit && <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }}>
                  ➕ Save Bookmark
              </button>}
              {isEdit && <button type="submit" className="btn fw-bold" style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }} onClick={updatebookmarkhandler}>
                  ➕ Update
              </button>}
          </form>
          <ShowBookmarks add={add} setIsEdit={setIsEdit} setEditobj={setEditobj}></ShowBookmarks>
    </div>
  );
}

export default Bookmarks;