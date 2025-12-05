import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CourseSections from '../components/CourseSections';
import DocumentUpload from '../components/DocumentUpload';
import DocumentList from '../components/DocumentList';

function CourseDetail() {
  const params = useParams();
  const courseId = params.id;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [activeTab, setActiveTab] = useState('lectures');
  const [refreshDocs, setRefreshDocs] = useState(0);
  const navigate = useNavigate();

  // check if user is logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  // handle upload success
  function handleUploadSuccess() {
    console.log('upload success, refreshing documents');
    setRefreshDocs(refreshDocs + 1);
  }

  // handle tab change
  function handleTabChange(tab) {
    console.log('tab changed to: ' + tab);
    setActiveTab(tab);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-12 col-md-3 col-lg-2 bg-dark p-3 sidebar-nav">
          <ul className="navbar-nav">
            <li className="nav-item mb-3">
              <Link to="/courses" className="nav-link text-light">
                <i className="bi bi-house"></i> <span className="d-none d-md-inline">My Courses</span>
                <span className="d-md-none">Courses</span>
              </Link>
            </li>
            <li className="nav-item mb-2">
              <button 
                className={'nav-link text-light ' + (activeTab === 'lectures' ? 'active' : '')}
                onClick={function() { handleTabChange('lectures'); }}
                style={{background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'}}
              >
                <i className="bi bi-play-circle"></i> Lectures
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={'nav-link text-light ' + (activeTab === 'documents' ? 'active' : '')}
                onClick={function() { handleTabChange('documents'); }}
                style={{background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'}}
              >
                <i className="bi bi-file-text"></i> Documents
              </button>
            </li>
          </ul>
        </nav>
        <main className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
          {activeTab === 'lectures' && <CourseSections courseId={courseId} />}
          {activeTab === 'documents' && (
            <div>
              <DocumentUpload courseId={courseId} onUploadSuccess={handleUploadSuccess} />
              <DocumentList courseId={courseId} key={refreshDocs} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseDetail;
