import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StudyAction } from '../Store/StudySlice';

function ShowBookmarks({add,setIsEdit,setEditobj}) {
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');

    const [bookmarks, setBookmarks] = useState([]);
  const [Delete, setDelete] = useState(null);
  const dispatch = useDispatch();
    
    function EditHandler(bookmark) {
       
        setEditobj({
            title:bookmark.title,
            description: bookmark.description,
            url: bookmark.url,
            id:bookmark.id,
     })
        setIsEdit(true);
        
    }

    async function deletehandler(bookmark) {
    try {
        const response = await fetch(
            `https://movies-e-commerce-default-rtdb.firebaseio.com/${cleanedemail}/bookmarks/${bookmark.id}.json`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete bookmark');
        } else {
            setDelete(Math.random());
        }
    } catch (error) {
        alert(error.message);
    }
}

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const response = await fetch(
          `https://movies-e-commerce-default-rtdb.firebaseio.com/${cleanedemail}/bookmarks.json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }

        const data = await response.json();
        const loadedBookmarks = [];

        for (const key in data) {
          loadedBookmarks.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            url: data[key].url,
          });
        }

        setBookmarks(loadedBookmarks);
         dispatch(StudyAction.bookmarkhandler({val: loadedBookmarks.length}))
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    }

    fetchBookmarks();
  }, [add,Delete]);

  return (
    <div className="p-4" style={{ backgroundColor: '#343434', color: '#f0e6d2', minHeight: '100vh' }}>
      <h2 className="mb-4 text-warning">🔍 Saved Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks added yet.</p>
      ) : (
        bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="mb-3 p-3 rounded d-flex justify-content-between align-items-start"
            style={{ backgroundColor: '#4b4b4b', border: '1px solid #c19a6b' }}
          >
            <div>
              <h5 className="text-warning">{bookmark.title}</h5>
              <p>{bookmark.description}</p>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm me-2"
                style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }}
              >
                Visit Link
              </a>
            </div>
            <div className="d-flex flex-column align-items-end">
              <button className="btn btn-sm mb-2 fw-bold" style={{ backgroundColor: '#ffc107', color: '#1c1c1c' }} onClick={()=>EditHandler(bookmark)}>
                ✏️ Edit
              </button>
              <button className="btn btn-sm fw-bold" style={{ backgroundColor: '#dc3545', color: 'white' }} onClick={()=>deletehandler(bookmark)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowBookmarks;