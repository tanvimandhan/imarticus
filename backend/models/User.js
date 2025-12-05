const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  progress: [{
    courseId: mongoose.Schema.Types.ObjectId,
    lecturesWatched: [Number],
    status: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// hash password before saving
userSchema.pre('save', async function(next) {
  console.log('saving user, checking password');
  if (this.isModified('password')) {
    console.log('password was modified, hashing it');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('password hashed');
  }
});

// function to check password
userSchema.methods.comparePassword = function(password) {
  console.log('comparing password');
  return bcrypt.compare(password, this.password);
};

// export the model
module.exports = mongoose.model('User', userSchema);
