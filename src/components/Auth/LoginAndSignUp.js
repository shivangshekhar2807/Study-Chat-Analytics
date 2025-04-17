import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import './LoginAndSignUp.css';

function LoginAndSignUp() {
  const [loggin, setLoggin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function authSubmitHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const url = loggin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVLhHUxSl3zE0nJ3cK-S-P70pMzepRi1k'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVLhHUxSl3zE0nJ3cK-S-P70pMzepRi1k';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Authentication failed!');
      }

      dispatch(
        AuthAction.logginHandler({
          token: data.idToken,
          email: email,
        })
      );

      navigate('/');
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }

  function toggleHandler() {
    setLoggin((prev) => !prev);
  }

  return (
    <div className="d-flex vh-100">
      
      <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center study-animation-container">
        <div className="floating-books text-center">
          <div className="book book1"></div>
          <div className="book book2"></div>
          <div className="book book3"></div>
          <h3 className="mt-4 text-light">Study-Chat-Analytics 📖</h3>
          <p className="text-light">Let’s make learning fun and focused</p>
        </div>
      </div>

      
      <div className="col-md-6 d-flex justify-content-center align-items-center form-panel">
        <div className="form-card p-4">
          <h2 className="text-warning text-center fw-bold mb-4">
            {loggin ? '🔐 Login' : '📝 Sign Up'}
          </h2>

          <form onSubmit={authSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-warning">
                Email
              </label>
              <input
                type="email"
                className="form-control custom-input"
                id="email"
                placeholder="Enter your email"
                ref={emailRef}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-warning">
                Password
              </label>
              <input
                type="password"
                className="form-control custom-input"
                id="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold mb-3">
              {loggin ? 'Login' : 'Sign Up'}
            </button>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1 border-light" />
              <span className="mx-2 text-light">OR</span>
              <hr className="flex-grow-1 border-light" />
            </div>

            <button
              type="button"
              onClick={toggleHandler}
              className="btn btn-outline-light w-100 fw-bold"
            >
              {loggin ? 'Create an Account' : 'Already have an account? Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSignUp;


