import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (
    <div>
      <div className="bg-primary text-white py-4 py-md-5">
        <div className="container">
          <h1 className="display-4" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}>Welcome to Imarticus Learning</h1>
          <p className="lead">Learn cutting-edge technology skills with our comprehensive courses</p>
          {!user && (
            <Link to="/courses" className="btn btn-light btn-lg mt-3">
              Get Started
            </Link>
          )}
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <i className="bi bi-book text-primary" style={{ fontSize: '2rem' }}></i>
                <h5 className="card-title mt-3">Comprehensive Courses</h5>
                <p className="card-text">Learn from industry experts with structured curriculum</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <i className="bi bi-play-circle text-primary" style={{ fontSize: '2rem' }}></i>
                <h5 className="card-title mt-3">Video Lectures</h5>
                <p className="card-text">Watch high-quality video content at your own pace</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <i className="bi bi-badge-check text-primary" style={{ fontSize: '2rem' }}></i>
                <h5 className="card-title mt-3">Certification</h5>
                <p className="card-text">Get certified upon completing your courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user && (
        <div className="bg-light py-5">
          <div className="container text-center">
            <h3>Ready to learn?</h3>
            <p>Continue with your enrolled courses or explore new ones</p>
            <Link to="/courses" className="btn btn-primary btn-lg">
              Explore Courses
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
