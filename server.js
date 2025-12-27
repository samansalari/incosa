const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Trust proxy - important for Railway
app.set('trust proxy', true);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Health check
app.get('/health', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA routes
app.get('/observatory', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'observatory.html'));
});

app.get('/expedition', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'expedition.html'));
});

app.get('/traces', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'traces.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'contact.html'));
});

// Default to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
