const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests to the backend
app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.REACT_APP_API_URL || 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // remove /api prefix
    },
  })
);

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

