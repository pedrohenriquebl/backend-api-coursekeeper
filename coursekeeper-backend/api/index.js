const { createServer } = require('http');
const { parse } = require('url');

// Import the compiled serverless handler from the build output
let handler;
try {
  handler = require('../dist/src/serverless').default;
} catch (e) {
  console.error(
    'Could not load serverless handler. Make sure to run `npm run build` before deploy.',
    e,
  );
  throw e;
}

module.exports = async (req, res) => {
  // ensure handler is a function
  const fn =
    typeof handler === 'function' ? handler : handler.default || handler;

  try {
    return await fn(req, res);
  } catch (err) {
    console.error('Error in serverless handler:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
