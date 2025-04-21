


import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StudyAction } from '../Store/StudySlice';

function ShowFriendNotes() {
  const [friendNotes, setFriendNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = useSelector((state) => state.Auth.email);
  const Friendcleanedemail = email.replace(/[@.]/g, '_');
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchFriendNotes() {
      try {
        const response = await fetch(
          `https://movies-e-commerce-default-rtdb.firebaseio.com/FriendsNote/${Friendcleanedemail}.json`
        );
        const data = await response.json();

        if (data) {
          const loadedNotes = [];

          
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              loadedNotes.push({
                id: key,
                ...data[key],
              });
            }
          }

          setFriendNotes(loadedNotes);
          dispatch(StudyAction.friendnoteshandler({val: loadedNotes.length}))
        }
      } catch (err) {
        console.error('Failed to fetch friend notes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFriendNotes();
  }, []);

  return (
    <div
      className="py-5"
      style={{
        backgroundColor: '#343434',
        minHeight: '100vh',
        color: '#f0e6d2',
      }}
    >
      <Container>
        <h2 className="text-center mb-4" style={{ color: '#f0e6d2' }}>
          📚 Friend Notes
        </h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : friendNotes.length === 0 ? (
          <p className="text-center">No friend notes available.</p>
        ) : (
          <Row className="g-4 justify-content-center">
            <Col md={10} lg={8}>  
              {friendNotes.map((note) => (
                <Card
                  key={note.id}
                  className="shadow mb-4"
                  style={{
                    borderRadius: '16px',
                    backgroundColor: '#f0e6d2',
                    border: '1px solid #c19a6b',
                  }}
                >
                  <Card.Body>
                    <h5 className="text-uppercase" style={{ color: '#4b4b4b' }}>
                      {note.title}
                    </h5>
                    <p style={{ color: '#4b4b4b' }}>{note.content}</p>
                  </Card.Body>
                  <Card.Footer>
                    <small style={{ color: '#4b4b4b' }}>
                      <strong>📧 Email:</strong> {note.email}
                      <br />
                      <strong>🕒 Time:</strong> {note.time || 'N/A'}<br></br>
                      <strong>📅 Day:</strong> {note.day || 'N/A'}<br></br>
                      <strong>📆 Date:</strong> {note.date || 'N/A'}<br></br>
                      
                    </small>
                  </Card.Footer>
                </Card>
              ))}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default ShowFriendNotes;


