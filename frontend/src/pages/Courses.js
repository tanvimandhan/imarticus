import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigate = useNavigate();

  // fetch courses when component loads
  useEffect(function() {
    console.log('courses page loaded');
    
    // check if user is logged in
    if (!user) {
      console.log('user not logged in, redirecting to login');
      navigate('/login');
      return;
    }

    // fetch courses
    async function fetchCourses() {
      try {
        console.log('fetching courses');
        const response = await courseService.getAllCourses();
        console.log('got courses: ' + response.data.length);
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.log('error fetching courses: ' + error);
        setLoading(false);
      }
    }
    
    fetchCourses();
  }, [user, navigate]);

  // handle enroll button click
  function handleEnroll(courseId) {
    console.log('enroll clicked for course: ' + courseId);
    navigate('/course/' + courseId);
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container my-4 my-md-5 px-3 px-md-4">
      <h2 className="mb-4">Available Courses</h2>
      {courses.length === 0 ? (
        <div className="alert alert-info">No courses available</div>
      ) : (
        <div className="row">
          {courses.map(function(course) {
            // Create default placeholder image using SVG data URI
            function getDefaultThumbnail(title) {
              const text = title ? title.substring(0, 15) : 'Course';
              const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
                <rect width="300" height="200" fill="#0d6efd"/>
                <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
              </svg>`;
              return `data:image/svg+xml;base64,${btoa(svg)}`;
            }
            
            const defaultThumbnail = getDefaultThumbnail(course.title);
            
            // Handle image load error
            function handleImageError(e) {
              const fallback = getDefaultThumbnail(course.title);
              if (e.target.src !== fallback) {
                e.target.src = fallback;
                e.target.onerror = null; // Prevent infinite loop
              }
            }
            
            return (
              <div key={course._id} className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <img 
                    src={course.thumbnail || defaultThumbnail} 
                    className="card-img-top" 
                    alt={course.title} 
                    style={{ height: '200px', objectFit: 'cover', backgroundColor: '#0d6efd' }}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-muted flex-grow-1">{course.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                      <small className="text-muted">
                        <i className="bi bi-book"></i> {course.totalLectures || 0} Lectures
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-clock"></i> {course.totalDuration || 'N/A'} hrs
                      </small>
                    </div>
                    <button 
                      className="btn btn-primary w-100"
                      onClick={function() { handleEnroll(course._id); }}
                    >
                      <i className="bi bi-play-circle"></i> Start Course
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Courses;
