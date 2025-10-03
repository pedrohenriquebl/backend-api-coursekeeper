const { createServer } = require('http');
const { parse } = require('url');

// Import the compiled serverless handler from the build output
let handler;
try {
  handler = require('../dist/serverless').default;
} catch (e) {
  console.error(
    'Could not load serverless handler. Make sure to run `npm run build` before deploy.',
  );
  throw e;
}

module.exports = async (req, res) => {
  // ensure handler is a function
  const fn =
    typeof handler === 'function' ? handler : handler.default || handler;
  return fn(req, res);
};
