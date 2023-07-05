const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('app', app)
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000/', // Replace with your backend server URL
      changeOrigin: true,
    })
  );
};
