// import React, { useState } from 'react';
// import SavedSidebar from './SavedSidebar';
// import Notes from './Notes';
// import Bookmarks from './Bookmarks';

// function Saved() {

//     const [showSavedItem, setShowSavedItem] = useState('Notes');

//     return (
//         <div className="d-flex">
//             <SavedSidebar setShowSavedItem={setShowSavedItem}></SavedSidebar>
//             {showSavedItem == 'Notes' && <Notes></Notes>}
//             {showSavedItem == 'Bookmarks' && < Bookmarks ></Bookmarks>}
//     </div>
//   );
// }

// export default Saved;


import React, { useState } from 'react';
import SavedSidebar from './SavedSidebar';
import Notes from './Notes';
import Bookmarks from './Bookmarks';
import ShowFriendNotes from './ShowFriendNotes';

function Saved() {
  const [showSavedItem, setShowSavedItem] = useState('Notes');

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      
      <SavedSidebar setShowSavedItem={setShowSavedItem} />

      
      <div className="flex-grow-1" style={{ overflowY: 'auto', backgroundColor: '#343434' }}>
        {showSavedItem === 'Notes' && <Notes />}
        {showSavedItem==='FriendsNote' && <ShowFriendNotes></ShowFriendNotes>}
        {showSavedItem === 'Bookmarks' && <Bookmarks />}
      </div>
    </div>
  );
}

export default Saved;