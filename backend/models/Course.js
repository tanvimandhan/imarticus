const mongoose = require('mongoose');

// lecture schema
const lectureSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: String,
  videoUrl: String,
  videoDuration: Number,
  order: Number
});

// section schema
const sectionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  order: Number,
  lectures: [lectureSchema],
  quiz: {
    title: String,
    questions: Number
  }
});

// course schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  instructor: String,
  thumbnail: String,
  sections: [sectionSchema],
  totalLectures: Number,
  totalDuration: Number,
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
module.exports = mongoose.model('Course', courseSchema);
