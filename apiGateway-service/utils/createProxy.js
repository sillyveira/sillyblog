const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function createProxy(options) {
  return createProxyMiddleware({
    ...options,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      
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
