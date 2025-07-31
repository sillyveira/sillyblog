const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use('/', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'auth-service'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});


