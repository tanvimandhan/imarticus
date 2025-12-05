import axios from 'axios';

// base url for api
const API_URL = 'http://localhost:5000/api';

// create axios instance
const api = axios.create({
  baseURL: API_URL
});

// add token to every request
api.interceptors.request.use(function(config) {
  console.log('making api request');
  const token = localStorage.getItem('token');
  if (token) {
    console.log('token found, adding to header');
    config.headers.Authorization = 'Bearer ' + token;
  } else {
    console.log('no token found');
  }
  return config;
});

// auth service functions
export const authService = {
  register: function(data) {
    console.log('calling register api');
    return api.post('/users/register', data);
  },
  login: function(data) {
    console.log('calling login api');
    return api.post('/users/login', data);
  },
  getProfile: function() {
    console.log('calling get profile api');
    return api.get('/users/profile');
  }
};

// course service functions
export const courseService = {
  getAllCourses: function() {
    console.log('calling get all courses api');
    return api.get('/courses');
  },
  getCourseById: function(id) {
    console.log('calling get course by id api, id: ' + id);
    return api.get('/courses/' + id);
  },
  createCourse: function(data) {
    console.log('calling create course api');
    return api.post('/courses', data);
  },
  enrollCourse: function(id) {
    console.log('calling enroll course api, id: ' + id);
    return api.post('/courses/' + id + '/enroll');
  },
  markLectureComplete: function(courseId, lectureId) {
    console.log('calling mark lecture complete api');
    return api.post('/courses/' + courseId + '/lecture/' + lectureId + '/complete');
  }
};

// document service functions
export const documentService = {
  uploadDocument: function(formData) {
    console.log('calling upload document api');
    return api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000
    });
  },
  getDocumentsByCourse: function(courseId) {
    console.log('calling get documents by course api, courseId: ' + courseId);
    return api.get('/documents/course/' + courseId);
  },
  getDocument: function(docId) {
    console.log('calling get document api, docId: ' + docId);
    return api.get('/documents/' + docId);
  },
  viewDocument: function(docId) {
    console.log('calling view document api, docId: ' + docId);
    return api.get('/documents/' + docId + '/view', {
      responseType: 'blob'
    });
  },
  downloadDocument: function(docId) {
    console.log('calling download document api, docId: ' + docId);
    return api.get('/documents/' + docId + '/download', {
      responseType: 'blob'
    });
  },
  summarizeDocument: function(docId) {
    console.log('calling summarize document api, docId: ' + docId);
    return api.post('/documents/' + docId + '/summarize');
  }
};

export default api;
