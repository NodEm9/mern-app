const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.104.246.147:5000',
      changeOrigin: true,
    })
  );
};