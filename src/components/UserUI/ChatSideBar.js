import React from 'react';
import { useSelector } from 'react-redux';

function ChatSidebar({ setSelectedView }) {
  const totalrecieved = useSelector((state) => state.Study.chatrecieved);
  const totalsent = useSelector((state) => state.Study.chatsent);
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
              onClick={() => setSelectedView('write')}
              className="btn mb-3 fw-bold text-start"
              style={{
                  backgroundColor: '#343434',
                  borderColor: '#c19a6b',
                  color: '#f0e6d2',
                  borderWidth: '2px',
                  borderRadius: '10px',
              }}
          >
              📥 Write Email
          </button>
            <button
              onClick={() => setSelectedView('received')}
              className="btn mb-3 fw-bold text-start"
              style={{
                  backgroundColor: '#343434',
                  borderColor: '#c19a6b',
                  color: '#f0e6d2',
                  borderWidth: '2px',
                  borderRadius: '10px',
              }}
          >
        📥 Received 
        <span style={badgeStyle}>{totalrecieved}</span>
          </button>

      <button
              onClick={() => setSelectedView('sent')}
              className="btn fw-bold text-start"
              style={{
                  backgroundColor: '#343434',
                  borderColor: '#c19a6b',
                  color: '#f0e6d2',
                  borderWidth: '2px',
                  borderRadius: '10px',
              }}
          >
        📤 Sent
        <span style={badgeStyle}>{totalsent}</span>
          </button>
    </div>
  );
}

export default ChatSidebar;