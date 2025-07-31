const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 8080;
const AUTH_SERVICE_PORT = process.env.authPort || 3000;
app.use(express.json());

// Proxy configuration for auth service. Necessary to route requests to the auth service.

const authServiceProxy = createProxyMiddleware({
  target: `http://localhost:${AUTH_SERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '',
  },
});

// Route all /auth requests to auth-service
app.use('/auth', authServiceProxy);

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Proxying /auth/* to http://localhost:${AUTH_SERVICE_PORT}`);
});
