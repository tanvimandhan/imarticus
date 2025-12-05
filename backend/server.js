// this is the main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// make the app
const app = express();

// use cors
app.use(cors());
// use json
app.use(express.json());

// root route
app.get('/', function(req, res) {
  res.json({ 
    message: 'Imarticus Learning API Server',
    status: 'running',
    endpoints: {
      test: '/api/test',
      users: '/api/users',
      courses: '/api/courses',
      documents: '/api/documents'
    }
  });
});

// test route
app.get('/api/test', function(req, res) {
  console.log('test was called');
  res.json({ message: 'Backend is working' });
});

// connect to database
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
}).then(function() {
  console.log('connected to mongo');
  
  // load routes
  const userRoutes = require('./routes/users');
  const courseRoutes = require('./routes/courses');
  const documentRoutes = require('./routes/documents');
  
  // use routes
  app.use('/api/users', userRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/documents', documentRoutes);
  
  // 404 handler for undefined routes
  app.use('*', function(req, res) {
    res.status(404).json({ 
      error: 'Route not found',
      message: `Cannot ${req.method} ${req.originalUrl}`,
      availableEndpoints: {
        root: 'GET /',
        test: 'GET /api/test',
        users: '/api/users',
        courses: '/api/courses',
        documents: '/api/documents'
      }
    });
  });
  
  // start server
  const port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log('server is running on port ' + port);
  });
}).catch(function(err) {
  console.log('error connecting to mongo: ' + err.message);
  process.exit(1);
});
