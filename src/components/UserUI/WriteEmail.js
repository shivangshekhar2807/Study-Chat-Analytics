import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

function WriteEmail() {
  const toEmailRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toEmail = toEmailRef.current.value.trim();
    const subject = subjectRef.current.value.trim();
    const content = contentRef.current.value.trim();

    if (!toEmail || !subject || !content) {
      alert('Please fill out all fields.');
      return;
    }

    const cleanedToEmail = toEmail.replace(/[@.]/g, '_');

    const newEmail = {
      from: cleanedemail,
      to: cleanedToEmail,
      subject,
      content,
      timestamp: new Date().toISOString(),
    };

    
    await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/Chatemails/sent/${cleanedemail}.json`, {
      method: 'POST',
      body: JSON.stringify(newEmail),
    });

    
    await fetch(`https://movies-e-commerce-default-rtdb.firebaseio.com/Chatemails/received/${cleanedToEmail}.json`, {
      method: 'POST',
      body: JSON.stringify(newEmail),
    });

    toEmailRef.current.value = '';
    subjectRef.current.value = '';
    contentRef.current.value = '';
    
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#343434',
          borderRadius: '15px',
          padding: '20px',
          border: '2px solid #c19a6b',
          color: '#f0e6d2',
        }}
      >
        <h4 className="mb-4 text-center">📧 Write Email</h4>

        <div className="mb-3">
          <label className="form-label">To:</label>
          <input
            type="email"
            ref={toEmailRef}
            placeholder="Recipient's Email"
            className="form-control"
            style={{
              backgroundColor: '#4b4b4b',
              color: '#f0e6d2',
              borderColor: '#c19a6b',
              borderWidth: '2px',
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject:</label>
          <input
            type="text"
            ref={subjectRef}
            placeholder="Email Subject"
            className="form-control"
            style={{
              backgroundColor: '#4b4b4b',
              color: '#f0e6d2',
              borderColor: '#c19a6b',
              borderWidth: '2px',
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content:</label>
          <textarea
            ref={contentRef}
            rows="6"
            placeholder="Write your email here..."
            className="form-control"
            style={{
              backgroundColor: '#4b4b4b',
              color: '#f0e6d2',
              borderColor: '#c19a6b',
              borderWidth: '2px',
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{
            backgroundColor: '#4b4b4b',
            borderColor: '#c19a6b',
            color: '#f0e6d2',
            borderWidth: '2px',
            borderRadius: '10px',
          }}
        >
          🚀 Send Email
        </button>
      </form>
    </div>
  );
}

export default WriteEmail;