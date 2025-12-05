const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

// get all courses
router.get('/', async function(req, res) {
  try {
    console.log('getting all courses');
    const allCourses = await Course.find();
    console.log('found ' + allCourses.length + ' courses');
    res.json(allCourses);
  } catch (error) {
    console.log('error getting courses: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// get one course by id
router.get('/:id', async function(req, res) {
  try {
    console.log('getting course with id: ' + req.params.id);
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    
    if (!course) {
      console.log('course not found');
      return res.status(404).json({ message: 'Course not found' });
    }
    
    console.log('course found: ' + course.title);
    res.json(course);
  } catch (error) {
    console.log('error getting course: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// create new course
router.post('/', auth, async function(req, res) {
  try {
    console.log('creating new course');
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();
    console.log('course saved with id: ' + savedCourse._id);
    res.status(201).json(savedCourse);
  } catch (error) {
    console.log('error creating course: ' + error);
    res.status(400).json({ message: error.message });
  }
});

// enroll in course
router.post('/:id/enroll', auth, async function(req, res) {
  try {
    console.log('enrolling in course: ' + req.params.id);
    const courseId = req.params.id;
    const userId = req.userId;
    
    // get user
    const user = await User.findById(userId);
    console.log('user found: ' + user.name);
    
    // check if already enrolled
    let alreadyEnrolled = false;
    for (let i = 0; i < user.enrolledCourses.length; i++) {
      if (user.enrolledCourses[i].toString() === courseId) {
        alreadyEnrolled = true;
        break;
      }
    }
    
    // if not enrolled, add course
    if (!alreadyEnrolled) {
      console.log('user not enrolled, adding course');
      user.enrolledCourses.push(courseId);
      user.progress.push({
        courseId: courseId,
        lecturesWatched: [],
        status: 'In Progress'
      });
      await user.save();
      console.log('user enrolled successfully');
    } else {
      console.log('user already enrolled');
    }
    
    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.log('error enrolling: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// mark lecture as complete
router.post('/:courseId/lecture/:lectureId/complete', auth, async function(req, res) {
  try {
    console.log('marking lecture complete');
    const courseId = req.params.courseId;
    const lectureId = req.params.lectureId;
    const userId = req.userId;
    
    // get user
    const user = await User.findById(userId);
    
    // find progress for this course
    let foundProgress = null;
    for (let i = 0; i < user.progress.length; i++) {
      if (user.progress[i].courseId.toString() === courseId) {
        foundProgress = user.progress[i];
        break;
      }
    }
    
    // if progress found, add lecture
    if (foundProgress) {
      // check if lecture already watched
      let alreadyWatched = false;
      for (let j = 0; j < foundProgress.lecturesWatched.length; j++) {
        if (foundProgress.lecturesWatched[j].toString() === lectureId) {
          alreadyWatched = true;
          break;
        }
      }
      
      // if not watched, add it
      if (!alreadyWatched) {
        foundProgress.lecturesWatched.push(lectureId);
        await user.save();
        console.log('lecture marked as complete');
      }
    }
    
    res.json({ message: 'Lecture marked as complete' });
  } catch (error) {
    console.log('error marking lecture complete: ' + error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
