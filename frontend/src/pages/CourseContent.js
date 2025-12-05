import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import DocumentList from '../components/DocumentList';
import './CourseContent.css';

function CourseContent() {
  const params = useParams();
  const courseId = params.id;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [activeTab, setActiveTab] = useState('lectures');

  // fetch course when component loads
  useEffect(function() {
    console.log('course content page loaded, course id: ' + courseId);
    
    // check if user is logged in
    if (!user) {
      console.log('user not logged in, redirecting');
      navigate('/login');
      return;
    }

    // fetch course data
    async function fetchCourse() {
      try {
        console.log('fetching course data');
        const response = await courseService.getCourseById(courseId);
        console.log('got course: ' + response.data.title);
        setCourse(response.data);
        
        // expand first section
        if (response.data.sections && response.data.sections.length > 0) {
          const firstSectionId = response.data.sections[0]._id;
          const newExpanded = {};
          newExpanded[firstSectionId] = true;
          setExpandedSections(newExpanded);
        }
        
        setLoading(false);
      } catch (error) {
        console.log('error fetching course: ' + error);
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId, user, navigate]);

  // toggle section expand/collapse
  function toggleSection(sectionId) {
    console.log('toggling section: ' + sectionId);
    const newExpanded = {};
    // copy old values
    for (let key in expandedSections) {
      newExpanded[key] = expandedSections[key];
    }
    // toggle this section
    if (newExpanded[sectionId]) {
      newExpanded[sectionId] = false;
    } else {
      newExpanded[sectionId] = true;
    }
    setExpandedSections(newExpanded);
  }

  // handle lecture click
  async function handleLectureClick(lecture) {
    console.log('lecture clicked: ' + lecture.title);
    setSelectedLecture(lecture);
    
    try {
      console.log('marking lecture as complete');
      await courseService.markLectureComplete(courseId, lecture._id);
      console.log('lecture marked as complete');
    } catch (error) {
      console.log('error marking lecture complete: ' + error);
    }
  }

  // handle tab change
  function handleTabChange(tab) {
    console.log('tab changed to: ' + tab);
    setActiveTab(tab);
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading course content...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Course not found</div>
        <button className="btn btn-secondary" onClick={function() { navigate('/courses'); }}>
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-content-page">
      <div className="course-header bg-primary text-white py-4 py-md-5">
        <div className="container px-3 px-md-4">
          <button 
            className="btn btn-light btn-sm mb-3"
            onClick={function() { navigate('/courses'); }}
          >
            <i className="bi bi-arrow-left"></i> Back to Courses
          </button>
          <h1 className="mb-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{course.title}</h1>
          <p className="lead mb-0">{course.description}</p>
          <div className="mt-3 d-flex flex-wrap gap-2">
            <span className="badge bg-light text-dark">
              <i className="bi bi-book"></i> {course.totalLectures || 0} Lectures
            </span>
            <span className="badge bg-light text-dark">
              <i className="bi bi-clock"></i> {course.totalDuration || 'N/A'} hrs
            </span>
            <span className="badge bg-light text-dark">
              <i className="bi bi-person"></i> {course.instructor || 'Instructor'}
            </span>
          </div>
        </div>
      </div>

      <div className="container py-4 py-md-5 px-3 px-md-4">
        <div className="row">
          <div className="col-12 col-lg-3 mb-4">
            <div className="card">
              <div className="card-header bg-light">
                <h5 className="mb-0">Course Lessons</h5>
              </div>
              <div className="card-body p-0">
                <div className="lessons-sidebar">
                  {course.sections && course.sections.map(function(section, index) {
                    const isExpanded = expandedSections[section._id] || false;
                    return (
                      <div key={section._id} className="lesson-item">
                        <button
                          className="lesson-toggle w-100 text-start p-3 border-0 bg-white"
                          onClick={function() { toggleSection(section._id); }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-bold">
                                <i className="bi bi-mortarboard"></i> Lesson {index + 1}
                              </div>
                              <small className="text-muted">{section.title}</small>
                            </div>
                            <i className={'bi ' + (isExpanded ? 'bi-chevron-up' : 'bi-chevron-down')}></i>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="lesson-content border-top">
                            {section.lectures && section.lectures.map(function(lecture, lectureIndex) {
                              const isSelected = selectedLecture && selectedLecture._id === lecture._id;
                              return (
                                <button
                                  key={lecture._id}
                                  className="lecture-link w-100 text-start px-3 py-2 border-0 bg-white text-decoration-none"
                                  onClick={function() { handleLectureClick(lecture); }}
                                  style={{ 
                                    paddingLeft: '2rem',
                                    borderLeft: isSelected ? '3px solid #0d6efd' : 'none',
                                    backgroundColor: isSelected ? '#f0f6ff' : 'white'
                                  }}
                                >
                                  <small>
                                    <i className="bi bi-play-circle"></i> {lectureIndex + 1}. {lecture.title}
                                  </small>
                                </button>
                              );
                            })}
                            {section.quiz && (
                              <button
                                className="quiz-link w-100 text-start px-3 py-2 border-0 bg-light text-decoration-none"
                                style={{ paddingLeft: '2rem' }}
                              >
                                <small>
                                  <i className="bi bi-question-circle"></i> Quiz: {section.quiz.title}
                                </small>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            <div className="card mb-3">
              <div className="card-header bg-light border-bottom p-2 p-md-3">
                <div className="btn-group w-100 d-flex" role="tablist">
                  <button
                    className={'btn btn-light border flex-fill ' + (activeTab === 'lectures' ? 'btn-primary' : '')}
                    onClick={function() { handleTabChange('lectures'); }}
                  >
                    <i className="bi bi-play-circle"></i> <span className="d-none d-sm-inline">Lectures</span>
                  </button>
                  <button
                    className={'btn btn-light border flex-fill ' + (activeTab === 'documents' ? 'btn-primary' : '')}
                    onClick={function() { handleTabChange('documents'); }}
                  >
                    <i className="bi bi-file-text"></i> <span className="d-none d-sm-inline">Documents</span>
                  </button>
                </div>
              </div>
              <div className="card-body p-3 p-md-4">
                {activeTab === 'lectures' && (
                  <React.Fragment>
                    {selectedLecture ? (
                      <div>
                        <h3 className="card-title mb-3">{selectedLecture.title}</h3>
                        {selectedLecture.videoUrl && (
                          <div className="video-container mb-4">
                            <iframe
                              width="100%"
                              height="auto"
                              style={{ minHeight: '300px', aspectRatio: '16/9' }}
                              src={selectedLecture.videoUrl}
                              title={selectedLecture.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        <p className="text-muted">{selectedLecture.description}</p>
                        <div className="alert alert-success" role="alert">
                          <i className="bi bi-check-circle"></i> Lecture marked as watched
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <i className="bi bi-play-circle" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                        <h5 className="mt-3 text-muted">Select a lecture to watch</h5>
                        <p className="text-muted">Click on any lecture from the lessons list on the left</p>
                      </div>
                    )}
                  </React.Fragment>
                )}
                {activeTab === 'documents' && (
                  <DocumentList courseId={courseId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
