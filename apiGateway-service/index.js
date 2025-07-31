const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const decodeJWT = require('./middlewares/jwt');
const authProxy = require('./routes/authProxy');
const postProxy = require('./routes/postProxy');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'api-gateway'
  });
});

// Mount proxy routes
app.use('/auth', decodeJWT, authProxy);
app.use('/post', decodeJWT, postProxy);


app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
