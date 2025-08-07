const express = require('express');
const cookieParser = require('cookie-parser');
const authProxy = require('./routes/authProxy');
const postProxy = require('./routes/postProxy');
const { addUserHeaders } = require('./middleware/jwtMiddleware');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cookieParser()); // Parse cookies before JWT middleware
app.use(addUserHeaders); // Add user headers from JWT
app.use(cors({
  origin: ['http://10.0.0.200:2999'],
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'api-gateway'
  });
});

// Proxy routes
app.use('/auth', authProxy);
app.use('/post', postProxy);

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Proxying /auth/* to auth service`);
  console.log(`Proxying /post/* to post service`);
});
