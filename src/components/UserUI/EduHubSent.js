

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StudyAction } from '../Store/StudySlice';

function EduHubSent() {
  const email = useSelector((state) => state.Auth.email);
  const cleanedemail = email.replace(/[@.]/g, '_');
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `https://movies-e-commerce-default-rtdb.firebaseio.com/EduHubContent/${cleanedemail}.json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch your sent posts.');
      }

      const data = await response.json();
      const posts = [];

      for (const postKey in data) {
        posts.push({
          id: postKey,
          ...data[postKey],
        });
      }

      setUserPosts(posts.reverse());
      setIsLoading(false);
      
      dispatch(StudyAction.eduhubsenthandler({val: posts.length}))
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://movies-e-commerce-default-rtdb.firebaseio.com/EduHubContent/${cleanedemail}/${postId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete the post.');
      }

      
      setUserPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: '#343434', color: '#f0e6d2', minHeight: '100vh' }}>
      <h2 className="text-warning">✉️ Sent Items</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : userPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {userPosts.map((post) => (
            <div className="col" key={post.id}>
              <div className="card h-100 text-dark" style={{ backgroundColor: '#f0e6d2', border: '1px solid #c19a6b' }}>
                <div className="card-body">
                  <h5 className="card-title text-uppercase" style={{ color: '#4b4b4b' }}>{post.title}</h5>
                  <p className="card-text" style={{ color: '#4b4b4b' }}>{post.description}</p>

                  <p className="card-text" style={{ color: '#4b4b4b', fontSize: '0.9rem' }}>
                    <strong>Posted by:</strong> {post.email}
                  </p>

                  {post.hashtags && (
                    <p className="card-text fw-bold" style={{ color: '#6fb1fc' }}>
                      {post.hashtags}
                    </p>
                  )}
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem' }}>
                  <div>
                    <span>{`${post.day}, ${post.date} ${post.month} ${post.year}`}</span> | <span>{post.time}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: '#4b4b4b',
                      color: '#f0e6d2',
                      border: '1px solid #c19a6b',
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EduHubSent;