const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function createProxy(options) {
  return createProxyMiddleware({
    ...options,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => { 
      // Forward user headers added by jwtMiddleware
      if (req.headers['x-user-id']) {
        proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
      }
      if (req.headers['x-user-name']) {
        proxyReq.setHeader('x-user-name', req.headers['x-user-name']);
      }
      if (req.headers['x-user-email']) {
        proxyReq.setHeader('x-user-email', req.headers['x-user-email']);
      }
      
      // Passing the body data to the proxy request
      if (req.body) { 
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Proxy error' });
    }
  });
};
