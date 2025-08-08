const express = require('express');
//const postRoutes = require('./src/routes/post.routes');
const app = express();
const PORT = process.env.PORT || 3001;
const postRoutes = require('./src/routes/post.routes');
const {extractUserFromHeaders} = require('./src/utils/userHeaders');
const setupAuthConsumer = require('./consumers/authConsumer');
const { connect } = require('./rabbit/rabbit');

async function start() {
  try {
    await connect();
    await setupAuthConsumer();
  } catch (error) {
    console.error('⚠️ Failed to setup Auth Consumer:', error.message);
    console.log('🔄 Service will continue without Auth Consumer features');
  }
}

start();

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


