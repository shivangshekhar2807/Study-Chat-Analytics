import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StudyAction } from '../Store/StudySlice';

function ReceivedEmail() {
  const [emails, setEmails] = useState([]);
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReceivedEmails = async () => {
      const res = await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/Chatemails/received/${cleanedemail}.json`);
      const data = await res.json();

      const loaded = [];
      for (let key in data) {
        loaded.push({ id: key, ...data[key] });
      }

      setEmails(loaded.reverse());
       dispatch(StudyAction.chatrecievedhandler({val: loaded.length}))
    };

    fetchReceivedEmails();
  }, []);

  return (
    <div className="p-4">
      <h4 style={{ color: '#f0e6d2' }}>📥 Received Emails</h4>
      {emails.map((email) => (
        <div key={email.id} className="mb-3 p-3" style={{ backgroundColor: '#343434', border: '2px solid #c19a6b', borderRadius: '10px', color: '#f0e6d2' }}>
          <p><strong>From:</strong> {email.from.replace(/_/g, '.')}</p>
          <p><strong>Subject:</strong> {email.subject}</p>
          <p><strong>Message:</strong> {email.content}</p>
          <small>{new Date(email.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default ReceivedEmail;