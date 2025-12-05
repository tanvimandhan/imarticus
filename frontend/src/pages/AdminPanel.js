import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { courseService } from '../services/api';
import DocumentUpload from '../components/DocumentUpload';

function AdminPanel() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const isAdmin = authContext.isAdmin;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('addCourse');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // course form data
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('');
  const [sections, setSections] = useState([
    {
      title: '',
      lectures: [
        { title: '', description: '', videoUrl: '', videoDuration: 0 }
      ],
      quiz: null
    }
  ]);

  // check if user is admin
  if (!user || !isAdmin) {
    navigate('/courses');
    return null;
  }

  // handle tab change
  function handleTabChange(tab) {
    console.log('tab changed to: ' + tab);
    setActiveTab(tab);
  }

  // handle course title change
  function handleCourseTitleChange(e) {
    console.log('course title changed');
    setCourseTitle(e.target.value);
  }

  // handle course description change
  function handleCourseDescriptionChange(e) {
    console.log('course description changed');
    setCourseDescription(e.target.value);
  }

  // handle course instructor change
  function handleCourseInstructorChange(e) {
    console.log('course instructor changed');
    setCourseInstructor(e.target.value);
  }

  // handle course thumbnail change
  function handleCourseThumbnailChange(e) {
    console.log('course thumbnail changed');
    setCourseThumbnail(e.target.value);
  }

  // handle section title change
  function handleSectionTitleChange(sectionIndex, value) {
    console.log('section title changed for section: ' + sectionIndex);
    const newSections = [];
    for (let i = 0; i < sections.length; i++) {
      if (i === sectionIndex) {
        const newSection = {
          title: value,
          lectures: sections[i].lectures,
          quiz: sections[i].quiz
        };
        newSections.push(newSection);
      } else {
        newSections.push(sections[i]);
      }
    }
    setSections(newSections);
  }

  // handle lecture change
  function handleLectureChange(sectionIndex, lectureIndex, field, value) {
    console.log('lecture changed');
    const newSections = [];
    for (let i = 0; i < sections.length; i++) {
      if (i === sectionIndex) {
        const newSection = {
          title: sections[i].title,
          lectures: [],
          quiz: sections[i].quiz
        };
        for (let j = 0; j < sections[i].lectures.length; j++) {
          if (j === lectureIndex) {
            const newLecture = {
              title: sections[i].lectures[j].title,
              description: sections[i].lectures[j].description,
              videoUrl: sections[i].lectures[j].videoUrl,
              videoDuration: sections[i].lectures[j].videoDuration
            };
            newLecture[field] = value;
            newSection.lectures.push(newLecture);
          } else {
            newSection.lectures.push(sections[i].lectures[j]);
          }
        }
        newSections.push(newSection);
      } else {
        newSections.push(sections[i]);
      }
    }
    setSections(newSections);
  }

  // add section
  function addSection() {
    console.log('adding section');
    const newSections = [];
    for (let i = 0; i < sections.length; i++) {
      newSections.push(sections[i]);
    }
    newSections.push({
      title: '',
      lectures: [{ title: '', description: '', videoUrl: '', videoDuration: 0 }],
      quiz: null
    });
    setSections(newSections);
  }

  // add lecture
  function addLecture(sectionIndex) {
    console.log('adding lecture to section: ' + sectionIndex);
    const newSections = [];
    for (let i = 0; i < sections.length; i++) {
      if (i === sectionIndex) {
        const newSection = {
          title: sections[i].title,
          lectures: [],
          quiz: sections[i].quiz
        };
        for (let j = 0; j < sections[i].lectures.length; j++) {
          newSection.lectures.push(sections[i].lectures[j]);
        }
        newSection.lectures.push({ title: '', description: '', videoUrl: '', videoDuration: 0 });
        newSections.push(newSection);
      } else {
        newSections.push(sections[i]);
      }
    }
    setSections(newSections);
  }

  // remove section
  function removeSection(sectionIndex) {
    console.log('removing section: ' + sectionIndex);
    if (sections.length === 1) {
      setErrorMsg('At least one section is required');
      return;
    }
    const newSections = [];
    for (let i = 0; i < sections.length; i++) {
      if (i !== sectionIndex) {
        newSections.push(sections[i]);
      }
    }
    setSections(newSections);
  }

  // remove lecture
  function removeLecture(sectionIndex, lectureIndex) {
    console.log('removing lecture');
    if (sections[sectionIndex].lectures.length === 1) {
      setErrorMsg('At least one lecture per section is required');
      return;
    }
    const newSections = [];
    for (let i = 0; i < sections.length; i++) {
      if (i === sectionIndex) {
        const newSection = {
          title: sections[i].title,
          lectures: [],
          quiz: sections[i].quiz
        };
        for (let j = 0; j < sections[i].lectures.length; j++) {
          if (j !== lectureIndex) {
            newSection.lectures.push(sections[i].lectures[j]);
          }
        }
        newSections.push(newSection);
      } else {
        newSections.push(sections[i]);
      }
    }
    setSections(newSections);
  }

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // check if title is filled
      if (!courseTitle.trim()) {
        setErrorMsg('Course title is required');
        setLoading(false);
        return;
      }

      // check if all sections have titles
      let allSectionsHaveTitles = true;
      for (let i = 0; i < sections.length; i++) {
        if (!sections[i].title.trim()) {
          allSectionsHaveTitles = false;
          break;
        }
      }
      if (!allSectionsHaveTitles) {
        setErrorMsg('All sections must have a title');
        setLoading(false);
        return;
      }

      // check if all lectures have titles
      let allLecturesHaveTitles = true;
      for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < sections[i].lectures.length; j++) {
          if (!sections[i].lectures[j].title.trim()) {
            allLecturesHaveTitles = false;
            break;
          }
        }
        if (!allLecturesHaveTitles) {
          break;
        }
      }
      if (!allLecturesHaveTitles) {
        setErrorMsg('All lectures must have a title');
        setLoading(false);
        return;
      }

      // create course data
      const courseData = {
        title: courseTitle,
        description: courseDescription,
        instructor: courseInstructor,
        thumbnail: courseThumbnail,
        sections: sections
      };

      console.log('creating course');
      const response = await courseService.createCourse(courseData);
      console.log('course created: ' + response.data.title);
      
      setSuccessMsg('Course "' + response.data.title + '" created successfully!');
      
      // reset form
      setCourseTitle('');
      setCourseDescription('');
      setCourseInstructor('');
      setCourseThumbnail('');
      setSections([
        {
          title: '',
          lectures: [{ title: '', description: '', videoUrl: '', videoDuration: 0 }],
          quiz: null
        }
      ]);

      setTimeout(function() {
        setSuccessMsg('');
      }, 5000);
    } catch (error) {
      console.log('error creating course: ' + error);
      let errorMessage = 'Error creating course';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // handle course id change
  function handleCourseIdChange(e) {
    console.log('course id changed');
    setSelectedCourseId(e.target.value);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-12 col-md-3 col-lg-2 bg-dark p-3 sidebar-nav">
          <h5 className="text-light mb-4">Admin Panel</h5>
          <ul className="navbar-nav">
            <li className="nav-item mb-3">
              <button 
                className={'nav-link text-light w-100 ' + (activeTab === 'addCourse' ? 'active' : '')}
                style={{background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'}}
                onClick={function() { handleTabChange('addCourse'); }}
              >
                <i className="bi bi-plus-circle"></i> <span className="d-none d-md-inline">Add Course</span>
                <span className="d-md-none">Add</span>
              </button>
            </li>
            <li className="nav-item mb-3">
              <button 
                className={'nav-link text-light w-100 ' + (activeTab === 'documents' ? 'active' : '')}
                style={{background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'}}
                onClick={function() { handleTabChange('documents'); }}
              >
                <i className="bi bi-file-upload"></i> <span className="d-none d-md-inline">Upload Documents</span>
                <span className="d-md-none">Upload</span>
              </button>
            </li>
          </ul>
        </nav>
        <main className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {activeTab === 'addCourse' && (
            <React.Fragment>
              <div className="mb-4">
                <h2><i className="bi bi-plus-circle"></i> Add New Course</h2>
                <p className="text-muted">Create a course with sections, lessons and lectures</p>
              </div>

              {successMsg && <div className="alert alert-success">{successMsg}</div>}
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

              <form onSubmit={handleSubmit} className="card p-3 p-md-4">
                <div className="row mb-4">
                  <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <label className="form-label fw-bold">Course Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={courseTitle}
                      onChange={handleCourseTitleChange}
                      placeholder="e.g., Advanced React"
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">Instructor</label>
                    <input
                      type="text"
                      className="form-control"
                      name="instructor"
                      value={courseInstructor}
                      onChange={handleCourseInstructorChange}
                      placeholder="Instructor name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={courseDescription}
                    onChange={handleCourseDescriptionChange}
                    placeholder="Course description"
                    rows="3"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Thumbnail URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="thumbnail"
                    value={courseThumbnail}
                    onChange={handleCourseThumbnailChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <hr />

                <h4 className="mb-3">Sections / Lessons</h4>
                {sections.map(function(section, sectionIndex) {
                  return (
                    <div key={sectionIndex} className="card mb-3 p-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Section {sectionIndex + 1}</h5>
                        {sections.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={function() { removeSection(sectionIndex); }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Section Title *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={section.title}
                          onChange={function(e) { handleSectionTitleChange(sectionIndex, e.target.value); }}
                          placeholder="e.g., Basics, Advanced Concepts"
                          required
                        />
                      </div>

                      <div className="ms-3">
                        <h6 className="mb-2">Lectures</h6>
                        {section.lectures.map(function(lecture, lectureIndex) {
                          return (
                            <div key={lectureIndex} className="card mb-2 p-2 bg-white">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <small className="fw-bold">Lecture {lectureIndex + 1}</small>
                                {section.lectures.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-warning"
                                    onClick={function() { removeLecture(sectionIndex, lectureIndex); }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>

                              <div className="mb-2">
                                <label className="form-label small fw-bold">Title *</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={lecture.title}
                                  onChange={function(e) { handleLectureChange(sectionIndex, lectureIndex, 'title', e.target.value); }}
                                  placeholder="Lecture title"
                                  required
                                />
                              </div>

                              <div className="mb-2">
                                <label className="form-label small fw-bold">Description</label>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={lecture.description}
                                  onChange={function(e) { handleLectureChange(sectionIndex, lectureIndex, 'description', e.target.value); }}
                                  placeholder="Brief description"
                                />
                              </div>

                              <div className="row mb-2">
                                <div className="col-12 col-md-8 mb-2 mb-md-0">
                                  <label className="form-label small fw-bold">Video URL</label>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={lecture.videoUrl}
                                    onChange={function(e) { handleLectureChange(sectionIndex, lectureIndex, 'videoUrl', e.target.value); }}
                                    placeholder="https://youtube.com/embed/..."
                                  />
                                </div>
                                <div className="col-12 col-md-4">
                                  <label className="form-label small fw-bold">Duration (mins)</label>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={lecture.videoDuration}
                                    onChange={function(e) { handleLectureChange(sectionIndex, lectureIndex, 'videoDuration', parseInt(e.target.value) || 0); }}
                                    placeholder="45"
                                    min="0"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          className="btn btn-sm btn-info"
                          onClick={function() { addLecture(sectionIndex); }}
                        >
                          + Add Lecture
                        </button>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="btn btn-secondary mb-4"
                  onClick={addSection}
                >
                  + Add Section
                </button>

                <hr />

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? 'Creating Course...' : 'Create Course'}
                </button>
              </form>
            </React.Fragment>
          )}

          {activeTab === 'documents' && (
            <React.Fragment>
              <div className="mb-4">
                <h2><i className="bi bi-file-upload"></i> Document Management</h2>
                <p className="text-muted">Upload and manage course documents</p>
              </div>

              <div className="card p-4 mb-4">
                <div className="mb-4">
                  <label className="form-label fw-bold">Select Course</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course ID"
                    value={selectedCourseId}
                    onChange={handleCourseIdChange}
                  />
                  <small className="text-muted d-block mt-2">
                    Enter the MongoDB Course ID to upload documents for that course
                  </small>
                </div>

                {selectedCourseId && (
                  <DocumentUpload courseId={selectedCourseId} onUploadSuccess={function() {}} />
                )}

                {!selectedCourseId && (
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle"></i> Please enter a Course ID to begin uploading documents
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
