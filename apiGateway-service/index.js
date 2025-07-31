const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 8080;
const AUTH_SERVICE_PORT = process.env.authPort || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'api-gateway'
  });
});


// Proxy configuration for auth service
const authServiceProxy = createProxyMiddleware({
  target: `http://localhost:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    // Sending the body via proxy request to be processed by the auth service.
    if (req.body && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
});

app.use('/auth', authServiceProxy);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Proxying /auth/* to http://localhost:${AUTH_SERVICE_PORT}`);
});
