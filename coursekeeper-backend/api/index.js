const handler = require('../dist/serverless').default;

module.exports = async (req, res) => {
  try {
    return await handler(req, res);
  } catch (err) {
    console.error('Serverless handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
