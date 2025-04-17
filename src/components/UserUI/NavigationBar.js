



import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink,useNavigate } from 'react-router-dom';
import { AuthAction } from '../Store/AuthSlice';

function NavigationBar() {
    const login = useSelector((state) => state.Auth.isloggedIn);
     const dispatch = useDispatch();
    const navigate = useNavigate();


     function logouthandler() {
        dispatch(AuthAction.logoutHandler());
         navigate('/Auth')
        
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid d-flex align-items-center">

        
        {login && <span
          className="navbar-brand mx-auto fw-bold fs-4"
          style={{
            background: "linear-gradient(45deg, #c19a6b, #f0e6d2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
        >
          Study-Chat-Analytics
        </span>}

        
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav mb-2 mb-lg-0">
                      {login && <li className="nav-item mx-2">
                          <NavLink
                              to="/"
                              className={({ isActive }) =>
                                  `nav-link fw-semibold ${isActive ? 'text-warning' : 'text-light'}`
                              }
                          >
                              Home
                          </NavLink>
                      </li>}
           {login && <li className="nav-item mx-2">
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? 'text-warning' : 'text-light'}`
                }
              >
                Chat
              </NavLink>
            </li>}
                      {login && <li className="nav-item mx-2">
                          <NavLink
                              to="/saved"
                              className={({ isActive }) =>
                                  `nav-link fw-semibold ${isActive ? 'text-warning' : 'text-light'}`
                              }
                          >
                              Saved
                          </NavLink>
                      </li>}
                      {login && <li className="nav-item mx-2">
                          <NavLink
                              to="/EduHub"
                              className={({ isActive }) =>
                                  `nav-link fw-semibold ${isActive ? 'text-warning' : 'text-light'}`
                              }
                          >
                              EduHub
                          </NavLink>
                      </li>}
                      {!login && <li className="nav-item mx-2">
                          <NavLink
                              to="/login"
                              className={({ isActive }) =>
                                  `nav-link fw-semibold ${isActive ? 'text-warning' : 'text-light'}`
                              }
                          >
                              Welcome
                          </NavLink>
                      </li>}
          </ul>
        </div>

       
        {login && (
          <button
          onClick={logouthandler}
            className="btn btn-danger fw-bold"
            style={{ borderRadius: '12px' }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;