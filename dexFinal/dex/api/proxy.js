const { createProxyMiddleware } = require("http-proxy-middleware");

export default (req, res) => {
  // Configure the proxy middleware
  const proxy = createProxyMiddleware({
    target: "https://api.1inch.dev/",
    changeOrigin: true,
    // Optionally, you can set headers if needed
    onProxyReq: (proxyReq) => {
      // Add your API key in the request header if required
      proxyReq.setHeader(
        "Authorization",
        `Bearer ${process.env.REACT_APP_1INCH_KEY}`
      );
    },
  });

  // Use the proxy middleware to handle the request
  proxy(req, res);
};
