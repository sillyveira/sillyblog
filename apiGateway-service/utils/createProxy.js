const { createProxyMiddleware } = require('http-proxy-middleware');

function createProxy({ target, pathRewrite }) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    onProxyReq: (proxyReq, req, res) => {
      // Forward cookies
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }

      // Forward custom user headers if they exist
      if (req.headers['x-user-id']) {
        proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
      }
      if (req.headers['x-user-name']) {
        proxyReq.setHeader('x-user-name', req.headers['x-user-name']);
      }
      if (req.headers['x-user-email']) {
        proxyReq.setHeader('x-user-email', req.headers['x-user-email']);
      }

      // Handle request body for POST/PUT/PATCH
      if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }
  });
}

module.exports = createProxy;
