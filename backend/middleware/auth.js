const jwt = require('jsonwebtoken');

// check if user is logged in
function auth(req, res, next) {
  console.log('checking auth');
  
  // get token from header
  let token = null;
  if (req.header('Authorization')) {
    token = req.header('Authorization').replace('Bearer ', '');
  }
  
  // if no token
  if (!token) {
    console.log('no token found');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // verify token
  try {
    console.log('verifying token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log('token is valid, user id is: ' + req.userId);
    next();
  } catch (error) {
    console.log('token verification failed');
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = auth;
