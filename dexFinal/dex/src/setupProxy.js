// setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    "/swap",
    createProxyMiddleware({
      target: "https://api.1inch.dev",
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        // Add your API key in the request header
        proxyReq.setHeader(
          "Authorization",
          `Bearer ${process.env.REACT_APP_1INCH_KEY}`
        );
      },
    })
  );
};
