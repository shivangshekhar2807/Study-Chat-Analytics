



import React from 'react';
import { useSelector } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';

function SavedSidebar({ setShowSavedItem }) {
  const totalnotes = useSelector((state) => state.Study.notes);

  const totalfriendsnotes = useSelector((state) => state.Study.friendnotes);
  const totalbookmark = useSelector((state) => state.Study.bookmark);
     const badgeStyle = {
    backgroundColor: '#c19a6b',
    color: '#4b4b4b',
    fontWeight: 'bold',
    borderRadius: '12px',
    padding: '0.25em 0.6em',
    fontSize: '0.8rem',
    marginLeft: '8px',
  };

  return (
    <div
      className="d-flex flex-column p-4 bg-dark"
      style={{
        width: '250px',
        backgroundColor: '#4b4b4b',
        borderRight: '2px solid #c19a6b',
        height: '100vh',
      }}
    >
      <button
        onClick={() => setShowSavedItem('Notes')}
        className="btn mb-4 fw-bold text-center"
        style={{
          backgroundColor: '#343434',
          borderColor: '#c19a6b',
          color: '#f0e6d2',
          borderWidth: '2px',
          borderRadius: '10px',
        }}
      >
        📒 Notes 
       <span style={badgeStyle}>{totalnotes}</span>
      </button>

       <button
        onClick={() => setShowSavedItem('FriendsNote')}
        className="btn mb-4 fw-bold text-center"
        style={{
          backgroundColor: '#343434',
          borderColor: '#c19a6b',
          color: '#f0e6d2',
          borderWidth: '2px',
          borderRadius: '10px',
        }}
      >
        📒 Friends Notes 
         <span style={badgeStyle}>{totalfriendsnotes}</span>
      </button>

      <button
        onClick={() => setShowSavedItem('Bookmarks')}
        className="btn fw-bold text-center"
        style={{
          backgroundColor: '#343434',
          borderColor: '#c19a6b',
          color: '#f0e6d2',
          borderWidth: '2px',
          borderRadius: '10px',
        }}
      >
        🔖 Bookmarks 
        <span style={badgeStyle}>{totalbookmark}</span>
      </button>
       
    </div>
  );
}

export default SavedSidebar;