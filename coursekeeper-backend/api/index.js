const fs = require('fs');
const path = require('path');

console.log('CWD now:', process.cwd());

try {
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    console.log('FILES in dist:', fs.readdirSync(distPath));
  } else {
    console.log('dist folder does NOT exist');
  }
} catch (err) {
  console.error('Error reading dist folder:', err);
}

let handler;

try {
  handler = require('./dist/serverless').default;
} catch (e) {
  console.error(
    'Could not load serverless handler. Make sure to run `npm run build` before deploy.',
    e,
  );
  throw e;
}
