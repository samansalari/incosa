const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

console.log('Starting server...');
console.log('PORT:', port);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Dist path:', path.join(__dirname, 'dist'));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Route handlers for each HTML page
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

// Default handler: send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});