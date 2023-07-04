// This function is a middleware that will be used to handle async functions

// Instead of using this kind of custom middleware, it's possible to use the express-async-handler package

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
