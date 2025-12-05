const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// register new user
router.post('/register', async function(req, res) {
  try {
    console.log('register request received');
    console.log('body is: ', req.body);
    
    // get data from body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    // check if fields are empty
    if (!name || !email || !password) {
      console.log('some field is missing');
      return res.status(400).json({ message: 'All fields required' });
    }
    
    // check if user exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log('user already exists');
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // create new user
    console.log('creating new user');
    const newUser = new User({
      name: name,
      email: email,
      password: password
    });
    
    // save user
    await newUser.save();
    console.log('user saved with id: ' + newUser._id);
    
    // make token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // send response
    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }
    });
  } catch (error) {
    console.log('error in register: ' + error);
    res.status(500).json({ message: error.message, error: error.toString() });
  }
});

// login user
router.post('/login', async function(req, res) {
  try {
    console.log('login request received');
    
    // get email and password
    const email = req.body.email;
    const password = req.body.password;
    
    // find user
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log('user not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // check password
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      console.log('password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // make token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // send response
    res.json({
      message: 'Logged in successfully',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.log('error in login: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// get user profile
router.get('/profile', auth, async function(req, res) {
  try {
    console.log('getting profile for user: ' + req.userId);
    
    // find user
    const user = await User.findById(req.userId).populate('enrolledCourses');
    
    // send user data
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      enrolledCourses: user.enrolledCourses,
      progress: user.progress
    });
  } catch (error) {
    console.log('error getting profile: ' + error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
