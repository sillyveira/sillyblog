const express = require('express');
//const postRoutes = require('./src/routes/post.routes');
const app = express();
const PORT = process.env.PORT || 3001;
const postRoutes = require('./src/routes/post.routes');
const {extractUserFromHeaders} = require('../shared/middleware/userHeaders');

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'post-service'
  });
});

app.use('/', extractUserFromHeaders, postRoutes);


app.listen(PORT, () => {
  console.log(`Post service running on port ${PORT}`);
});


