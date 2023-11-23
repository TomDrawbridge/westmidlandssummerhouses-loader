// pages/api/[...all].js
import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware({
  target: 'https://api.trainerize.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  logLevel: 'debug',
  onProxyReq: (proxyReq, req) => {
    // Add custom headers to the proxy request
    proxyReq.setHeader('Authorization', 'Basic MjYwMjA2OkJUUldkbDlPT1VHbm1VSTBPRGtmdw==');
    proxyReq.setHeader('Content-Type', 'application/json');
    // Add other headers as needed
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      // Update header
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // Write out body changes to the proxyReq stream
      proxyReq.write(bodyData);
    }
  },
});

export default (req, res) => {
  // Convert the request body to JSON and attach it to the req.body
  req.body = req.body && JSON.parse(req.body);
  
  // Proxy the API request
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
  });
};
