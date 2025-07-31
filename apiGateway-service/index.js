const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const authProxy = require('./routes/authProxy');
const postProxy = require('./routes/postProxy');

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'api-gateway'
  });
});

// Mount proxy routes
app.use('/auth', authProxy);
app.use('/post', postProxy);


app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
