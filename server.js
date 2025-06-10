// server.js - Simple version to avoid path-to-regexp issues
const express = require('express');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http');

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API Server is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/health',
      'GET /api/users',
      'POST /api/users',
      'GET /api/user?id=1',
      'PUT /api/user/user?id=1',
      'DELETE /api/user?id=1'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the serverless handler
module.exports.handler = serverless(app);