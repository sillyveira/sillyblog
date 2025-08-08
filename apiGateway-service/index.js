const express = require('express');
const cookieParser = require('cookie-parser');
const authProxy = require('./routes/authProxy');
const postProxy = require('./routes/postProxy');
const { addUserHeaders } = require('./middleware/jwtMiddleware');
const { verifyToken } = require('./utils/jwt');
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

// Me endpoint - Get current user info from JWT cookie
app.get('/me', (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token não encontrado. Faça login primeiro.' 
      });
    }

    // Verify and decode the JWT token
    const decoded = verifyToken(token);
    
    // Return user information
    res.status(200).json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      iat: decoded.iat,
      exp: decoded.exp
    });
    
  } catch (error) {
    console.error('Error while verifying token:', error);
    res.status(401).json({ 
      error: 'Token inválido ou expirado' 
    });
  }
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
