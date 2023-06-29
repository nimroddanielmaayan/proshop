import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Any back end middleware has access to the req and res objects. It also needs the "next" parameter, which is a function that we call when we are done with the middleware, so that it can move on to the next middleware in the stack

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      // 401 - Unauthorized
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    // 401 - Unauthorized
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    // 401 - Unauthorized
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
