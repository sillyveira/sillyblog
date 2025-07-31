const createProxy = require('../utils/createProxy');
const POST_SERVICE_PORT = process.env.postPort || 3001;

// Personalized proxy for post service to allow body parsing 
module.exports = createProxy({
  target: `http://localhost:${POST_SERVICE_PORT}`,
  pathRewrite: { '^/post': '' }
});
