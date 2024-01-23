const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  //proxy per le api
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  //proxy per sse
  app.use(
    '/sse',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};