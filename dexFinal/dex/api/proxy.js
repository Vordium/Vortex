const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const apiProxy = createProxyMiddleware({
    target: 'https://api.1inch.dev', // Replace with the target API URL
    changeOrigin: true,
    pathRewrite: {
      '^/api/proxy': '', // Rewrite the path as needed
    },
  });

  apiProxy(req, res);
};
