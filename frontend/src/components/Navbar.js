import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const logoutFunction = authContext.logout;
  const isAdmin = authContext.isAdmin;
  const navigate = useNavigate();

  // handle logout
  function handleLogout() {
    console.log('logout clicked');
    logoutFunction();
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-mortarboard"></i> Imarticus Learning
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                <i className="bi bi-book"></i> Courses
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  <i className="bi bi-gear"></i> Admin Panel
                </Link>
              </li>
            )}
            {user ? (
              <React.Fragment>
                <li className="nav-item">
                  <span className="nav-link text-info">
                    <i className="bi bi-person-circle"></i> {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="bi bi-person-plus"></i> Register
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
