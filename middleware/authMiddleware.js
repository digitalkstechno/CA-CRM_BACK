const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      let user = await Admin.findById(decoded.id).select('-password');
      if (!user) {
        user = await Staff.findById(decoded.id).select('-password');
      }

      if (user) {
        req.user = user;
        req.admin = user; // for backward compatibility
        next();
      } else {
        res.status(401).json({ message: 'Not authorized, user not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
