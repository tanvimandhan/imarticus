import React, { useState, useEffect } from 'react';
import { courseService } from '../services/api';
import VideoPlayer from './VideoPlayer';

function CourseSections(props) {
  const courseId = props.courseId;
  const [course, setCourse] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // fetch course when component loads
  useEffect(function() {
    console.log('fetching course sections for course: ' + courseId);
    fetchCourse();
  }, [courseId]);

  // function to fetch course
  async function fetchCourse() {
    try {
      console.log('calling api to get course');
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

  // toggle section
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
  async function handleLectureClick(lecture, courseId, lectureId) {
    console.log('lecture clicked: ' + lecture.title);
    setSelectedLecture(lecture);
    
    try {
      console.log('marking lecture as complete');
      await courseService.markLectureComplete(courseId, lectureId);
      console.log('lecture marked as complete');
    } catch (error) {
      console.log('error marking lecture complete: ' + error);
    }
  }

  // handle close video
  function handleCloseVideo() {
    console.log('closing video');
    setSelectedLecture(null);
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="alert alert-danger">Course not found</div>
    );
  }

  return (
    <div className="course-sections">
      <div className="course-header mb-4 p-4 bg-light rounded">
        <h1 className="mb-2">{course.title}</h1>
        <p className="text-muted mb-2">{course.description}</p>
        <div className="d-flex gap-3">
          <span className="badge bg-success">Status: Completed</span>
          <span className="text-muted">Instructor: {course.instructor || 'N/A'}</span>
        </div>
      </div>

      <div className="sections-container">
        {course.sections && course.sections.map(function(section, index) {
          const isExpanded = expandedSections[section._id] || false;
          return (
            <div key={section._id} className="card mb-3">
              <div 
                className="card-header bg-light cursor-pointer d-flex justify-content-between align-items-center"
                onClick={function() { toggleSection(section._id); }}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <h5 className="mb-0">
                    <i className="bi bi-folder"></i> {index + 1}. {section.title}
                  </h5>
                  <small className="text-muted">
                    {section.lectures ? section.lectures.length : 0} Lectures
                    {section.quiz && ', 1 Quiz'}
                  </small>
                </div>
                <span className="text-primary">
                  <i className={'bi ' + (isExpanded ? 'bi-dash' : 'bi-plus')}></i>
                </span>
              </div>

              {isExpanded && (
                <div className="card-body">
                  {section.lectures && section.lectures.map(function(lecture, lectureIndex) {
                    return (
                      <div 
                        key={lecture._id} 
                        className="lecture-item p-2 p-md-3 mb-2 border rounded d-flex align-items-center flex-wrap"
                        style={{ backgroundColor: '#f9f9f9' }}
                      >
                        <i className="bi bi-play-circle text-primary me-2 me-md-3" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}></i>
                        <div className="flex-grow-1" style={{ minWidth: '200px' }}>
                          <h6 className="mb-1" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>{lectureIndex + 1}. {lecture.title}</h6>
                          <small className="text-muted d-none d-md-inline">{lecture.description}</small>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-primary mt-2 mt-md-0"
                          onClick={function() { handleLectureClick(lecture, courseId, lecture._id); }}
                        >
                          <i className="bi bi-play"></i> <span className="d-none d-sm-inline">Watch</span>
                        </button>
                      </div>
                    );
                  })}

                  {section.quiz && (
                    <div className="quiz-item p-3 mb-2 border rounded d-flex align-items-center" style={{ backgroundColor: '#f0f8ff' }}>
                      <i className="bi bi-question-circle text-warning me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{section.quiz.title}</h6>
                        <small className="text-muted">{section.quiz.questions} Questions</small>
                      </div>
                      <button className="btn btn-sm btn-outline-warning">
                        <i className="bi bi-pencil"></i> Attempt
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedLecture && (
        <VideoPlayer 
          lecture={selectedLecture} 
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}

export default CourseSections;
