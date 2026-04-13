/**
 * Wraps an async route handler and forwards any thrown error to Express's
 * next() — eliminates the need for try/catch in every controller.
 *
 * Usage:
 *   async function myHandler(req, res) { ... }
 *   module.exports = { myHandler: asyncHandler(myHandler) };
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
