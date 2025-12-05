import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProgramLanding from './pages/ProgramLanding';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseContent from './pages/CourseContent';
import AdminPanel from './pages/AdminPanel';
import { AuthContext } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// component for routes
function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // check if we should show custom navbar
  let showCustomNavbar = false;
  if (currentPath === '/') {
    showCustomNavbar = true;
  }
  
  return (
    <React.Fragment>
      {!showCustomNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProgramLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/program-landing" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseContent />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </React.Fragment>
  );
}

// main app component
function App() {
  const authContext = useContext(AuthContext);
  const loading = authContext.loading;
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
