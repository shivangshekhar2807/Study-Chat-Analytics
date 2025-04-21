import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StudyAction } from '../Store/StudySlice';

function SentEmail() {
  const [emails, setEmails] = useState([]);
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');
  const dispatch = useDispatch();
  const [Delete, setDelete] = useState(null);

  useEffect(() => {
    const fetchSentEmails = async () => {
      const res = await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/Chatemails/sent/${cleanedemail}.json`);
      const data = await res.json();

      const loaded = [];
      for (let key in data) {
        loaded.push({ id: key, ...data[key] });
      }

      setEmails(loaded.reverse());
       dispatch(StudyAction.chatsenthandler({val: loaded.length}))
    };

    fetchSentEmails();
  }, [Delete]);

 async function deletesentHandler(id) {
  try {
    const res = await fetch(
      `https://movies-e-commerce-default-rtdb.firebaseio.com/Chatemails/sent/${cleanedemail}/${id}.json`,
      {
        method: 'DELETE',
      }
    );

    if (res.ok) {
      const updatedEmails = emails.filter((email) => email.id !== id);
      setEmails(updatedEmails);
      dispatch(StudyAction.chatsenthandler({ val: updatedEmails.length }));
      setDelete(Math.random());
    } else {
      console.error('Failed to delete email');
    }
  } catch (error) {
    console.error('Error deleting email:', error);
  }
}

  return (
    
    <div className="p-4">
  <h4 style={{ color: '#f0e6d2' }}>📤 Sent Emails</h4>
  {emails.map((email) => (
    <div
      key={email.id}
      className="mb-3 p-3 d-flex flex-column"
      style={{
        backgroundColor: '#343434',
        border: '2px solid #c19a6b',
        borderRadius: '10px',
        color: '#f0e6d2',
      }}
    >
      <p><strong>To:</strong> {email.to.replace(/_/g, '.')}</p>
      <p><strong>Subject:</strong> {email.subject}</p>
      <p><strong>Message:</strong> {email.content}</p>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small>{new Date(email.timestamp).toLocaleString()}</small>
        <button
          className="btn btn-sm"
          style={{ backgroundColor: '#c19a6b', color: '#1c1c1c' }}
          onClick={() => deletesentHandler(email.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  ))}
</div>
  );
}

export default SentEmail;