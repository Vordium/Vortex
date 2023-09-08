const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Specify the path to match for proxying
    createProxyMiddleware({
      target: 'https://api.1inch.dev',  // Target URL of the 1inch API
      changeOrigin: true,  // Enable CORS handling
      pathRewrite: {
        '^/api': '',  // Remove the '/api/1inch' path prefix when forwarding the request
      },
    })
  );
};
