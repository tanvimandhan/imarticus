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

// load routes (before DB connection for serverless compatibility)
const path = require('path');
const userRoutes = require(path.join(__dirname, 'routes', 'users'));
const courseRoutes = require(path.join(__dirname, 'routes', 'courses'));
const documentRoutes = require(path.join(__dirname, 'routes', 'documents'));

// use routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/documents', documentRoutes);

// 404 handler for undefined routes
app.use(function(req, res) {
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

// connect to database (with better error handling for serverless)
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Don't exit in serverless - let the function handle the error
    isConnected = false;
  }
}

// Connect to database
connectDB();

// Export handler for Vercel serverless functions
// Vercel automatically provides req and res to the exported function
module.exports = app;

// For traditional server mode (local development)
if (!process.env.VERCEL && process.env.PORT) {
  const port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log('server is running on port ' + port);
  });
}
