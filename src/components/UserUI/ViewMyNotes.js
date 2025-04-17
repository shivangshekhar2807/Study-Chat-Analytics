import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner,Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function ViewMyNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const emailref = useRef();

  const email = useSelector((state) => state.Auth.email);
const cleanedemail = email.replace(/[@.]/g, '_');

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(
          `https://movies-e-commerce-default-rtdb.firebaseio.com/Mynotes/${cleanedemail}/${id}.json`
        );
            console.log(response)
          

        if (!response.ok) {
          throw new Error('Failed to fetch note.');
        }

        const data = await response.json();
        console.log(data)
       
        if (data) {
            setNote(data);
            
        } else {
          setNote(null);  
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id, cleanedemail]);

  function goBackHandler() {
    navigate('/saved', { replace: true });
  }
    
    function showformhandler() {
        setShowForm((prev)=>!prev);
    }

    async function sendNoteshandler(event) {
        event.preventDefault();
        const Friendemail = emailref.current.value;
        const Friendcleanedemail = Friendemail.replace(/[@.]/g, '_');
          const now = new Date();
          const time = now.toLocaleTimeString();
          const date = now.toLocaleDateString();
          const day = now.toLocaleDateString(undefined, { weekday: 'long' });
          const year = now.getFullYear();

        try {
           const response = await fetch(
               `https://movies-e-commerce-default-rtdb.firebaseio.com/FriendsNote/${Friendcleanedemail}.json`, {
                   method: 'POST',
                   body: JSON.stringify({
                       email: email,
                      title: note.title,
                       content: note.content,
                      time,
                       date,
                        day,
                        year,
                   }),
                    headers: {
                     "Content-Type": "application/json",
                }
          }
           );
            if (!response.ok) {
                const responseerror = response.json();
                throw new Error(responseerror.error)
            }
            
        }
        catch (error) {
            alert(error.message);
        }
        setShowForm((prev) => !prev);

    }
    

  return ( <>
    <div
      className="py-5"
      style={{
        backgroundColor: '#343434',
        minHeight: '100vh',
        color: '#f0e6d2',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <Card
                className="shadow"
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#f0e6d2',
                  border: '1px solid #c19a6b',
                }}
              >
                <Card.Body>
                  <h2
                    className="mb-3 text-uppercase"
                    style={{ color: '#4b4b4b' }}
                  >
                    {note?.title || 'Untitled'}
                  </h2>
                  <p style={{ color: '#4b4b4b' }}>
                    {note?.content || 'No content available.'}
                  </p>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                     <Button
                       onClick={showformhandler}
                       style={{
                         backgroundColor: '#4b9cd3', 
                         border: 'none',
                         color: '#ffffff',
                         padding: '8px 20px',
                         borderRadius: '25px',
                         fontWeight: 'bold',
                       }}
                     >
                       🔙 Send To
                     </Button>

                  <Button
                    onClick={goBackHandler}
                    style={{
                      backgroundColor: '#c19a6b', 
                      border: 'none',
                      color: '#1c1c1c',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: 'bold',
                    }}
                  >
                    🔙 Back
                  </Button>
                </Card.Footer>
              </Card>
            )}
          </Col>
        </Row>
          </Container>
          {showForm && <Container className="p-4 mt-5" style={{ maxWidth: '400px', backgroundColor: '#f0e6d2', borderRadius: '10px' }}>
              <Form onSubmit={sendNoteshandler}>
                  <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                          ref={emailref}
                          type="email"
                          placeholder="Enter email"
                      />
                  </Form.Group>

                  <Button
                      type='submit'
                      style={{
                          backgroundColor: '#c19a6b',
                          border: 'none',
                          color: '#1c1c1c',
                          padding: '8px 20px',
                          borderRadius: '25px',
                          fontWeight: 'bold',
                      }}
                  >
                      📩 Send
                  </Button>
              </Form>
          </Container>}
      </div>
      
      </>
  );
}

export default ViewMyNotes;