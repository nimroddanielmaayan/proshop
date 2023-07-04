// Check for a route that doesn't exist and return a 404 error
const notFound = (req, res, next) => {
  // Create a new error object
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // Set the status to 404
  res.status(404);
  // Pass the error to the next middleware
  next(error);
};

// Override the default error handling middleware wth our own
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Set the status code and return the error message
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };

// express.js has built-in error handling middleware, which can be seen here:
// https://expressjs.com/en/guide/error-handling.html

// In this application, we'll define our own error handling middleware
// In other projects, it's perfectly fine to stick to the built-in error handling middleware that express.js provides

// We'll define functions for 2 possibilities:
//  1) a route that doesn't exist and returns a 404 error
//  2) a route that exists, but has an error
