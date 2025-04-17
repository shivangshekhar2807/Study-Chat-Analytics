import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ShowEduHubContent from './ShowEduHubContent';

function EduHubContent() {
  const [showForm, setShowForm] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();
    const hashtagsRef = useRef();
    const email = useSelector((state) => state.Auth.email);
      const cleanedemail = email.replace(/[@.]/g, '_');
    const [addContent, setaddContent] = useState(null);
    
    

  const handleSubmit = async (e) => {
  e.preventDefault();

  const title = titleRef.current.value.trim();
  const description = descriptionRef.current.value.trim();
  const hashtags = hashtagsRef.current.value.trim();

  if (title === '' || description === '') {
    alert('Please fill in both title and description.');
    return;
  }

  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  const postData = {
    title,
    description,
    hashtags,
    time: formattedTime,
    day,
    date,
    month,
    year,
    email, 
  };

  try {
    const response = await fetch(
      `https://movies-e-commerce-default-rtdb.firebaseio.com/EduHubContent/${cleanedemail}.json`,
      {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to post EduHub content');
    }

    // Clear inputs
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    hashtagsRef.current.value = '';
      setaddContent(Math.random());
    setShowForm(false);
   
  } catch (error) {
    alert('Error submitting content: ' + error.message);
  }
};
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: '#343434',
        color: '#f0e6d2',
        minHeight: '100vh',
      }}
    >
      <h2 className="text-warning">📘 EduHub Content</h2>
      <p>Display your content here...</p>

      <button
        className="btn mb-4 fw-bold"
        style={{
          backgroundColor: '#c19a6b',
          borderColor: '#f0e6d2',
          color: '#343434',
          borderWidth: '2px',
          borderRadius: '10px',
        }}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? 'Hide Form' : 'Create New Post'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded"
          style={{
            backgroundColor: '#4b4b4b',
            border: '2px solid #c19a6b',
            borderRadius: '12px',
            maxWidth: '600px',
          }}
        >
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control"
              ref={titleRef}
              style={{
                backgroundColor: '#343434',
                color: '#f0e6d2',
                border: '1px solid #c19a6b',
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="4"
              ref={descriptionRef}
              style={{
                backgroundColor: '#343434',
                color: '#f0e6d2',
                border: '1px solid #c19a6b',
              }}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Hashtags</label>
            <input
              type="text"
              className="form-control"
              placeholder="#education #notes"
              ref={hashtagsRef}
              style={{
                backgroundColor: '#343434',
                color: '#f0e6d2',
                border: '1px solid #c19a6b',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn fw-bold"
            style={{
              backgroundColor: '#c19a6b',
              color: '#343434',
              border: 'none',
              borderRadius: '10px',
            }}
          >
            Post
          </button>
        </form>
          )}
          <ShowEduHubContent addContent={addContent}></ShowEduHubContent>
    </div>
  );
}

export default EduHubContent;