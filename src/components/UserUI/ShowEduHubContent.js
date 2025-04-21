



import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StudyAction } from '../Store/StudySlice';

function ShowEduHubContent({ addContent }) {
  const [eduPosts, setEduPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchEduContent() {
      try {
        const response = await fetch(
          'https://movies-e-commerce-default-rtdb.firebaseio.com/EduHubContent.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch EduHub content');
        }

        const data = await response.json();
        const loadedPosts = [];

        for (const userKey in data) {
          const userPosts = data[userKey];
          for (const postKey in userPosts) {
            const post = userPosts[postKey];
            loadedPosts.push({
              id: postKey,
              ...post,
            });
          }
        }

        setEduPosts(loadedPosts.reverse());
        setFilteredPosts(loadedPosts.reverse());
        setIsLoading(false);
          dispatch(StudyAction.eduhubcontenthandler({ val: loadedPosts.length }));
      } catch (error) {
        alert(error.message);
        setIsLoading(false);
      }
    }

    fetchEduContent();
  }, [addContent]);

  const handleViewMore = (id) => {
    setFilteredPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isExpanded: !post.isExpanded } : post
      )
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase().replace('#', '');
    setSearchTerm(value);

    if (!value) {
      setFilteredPosts(eduPosts);
      return;
    }

    const matched = eduPosts.filter((post) =>
      post.hashtags?.toLowerCase().includes(value)
    );

    setFilteredPosts(matched);
  };

  

  return (
    <div className="mt-5">
      <h3 className="text-warning">📚 Latest Posts</h3>

      <div className="mb-4 mt-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by hashtag (e.g. react)"
          className="form-control"
          style={{
            backgroundColor: '#f0e6d2',
            border: '1px solid #c19a6b',
            color: '#4b4b4b',
          }}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {filteredPosts.map((post) => (
            <div className="col" key={post.id}>
              <div
                className="card h-100 text-dark"
                style={{ backgroundColor: '#f0e6d2', border: '1px solid #c19a6b' }}
              >
                <div className="card-body">
                  <h5 className="card-title text-uppercase" style={{ color: '#4b4b4b' }}>
                    {post.title}
                  </h5>
                  <p className="card-text" style={{ color: '#4b4b4b' }}>
                    {post.isExpanded
                      ? post.description
                      : post.description.slice(0, 150) + '...'}
                  </p>

                  <button
                    onClick={() => handleViewMore(post.id)}
                    style={{
                      backgroundColor: '#c19a6b',
                      border: 'none',
                      color: '#343434',
                      cursor: 'pointer',
                    }}
                  >
                    {post.isExpanded ? 'Show Less' : 'View More'}
                  </button>

                  {post.email && (
                    <p className="card-text" style={{ color: '#4b4b4b', fontSize: '0.9rem' }}>
                      <strong>Posted by:</strong> {post.email}
                    </p>
                  )}

                  {post.hashtags && (
                    <p className="card-text fw-bold" style={{ color: '#6fb1fc' }}>
                      {post.hashtags}
                    </p>
                  )}
                </div>

                <div
                  className="card-footer d-flex justify-content-between"
                  style={{ fontSize: '0.85rem' }}
                >
                  <span>{`${post.day}, ${post.date} ${post.month} ${post.year}`}</span>
                  <span>{post.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowEduHubContent;