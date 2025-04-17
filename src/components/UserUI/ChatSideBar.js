import React from 'react';

function ChatSidebar({ setSelectedView }) {
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
          </button>
    </div>
  );
}

export default ChatSidebar;