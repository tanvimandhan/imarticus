const mongoose = require('mongoose');

// document schema
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  fileName: String,
  fileSize: Number,
  fileType: String,
  filePath: String,
  content: String,
  summary: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// export model
module.exports = mongoose.model('Document', documentSchema);
