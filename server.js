const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Make database connection optional
let client = null;

if (process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  client.connect((err) => {
    if (err) {
      console.error('Database connection error (non-critical):', err.message);
    } else {
      console.log('Connected to database');
    }
  });
} else {
  console.log('DATABASE_URL not set - running without database');
}

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API endpoint example
app.get('/api/test', async (req, res) => {
  if (!client) {
    return res.status(503).json({ error: 'Database not connected' });
  }
  try {
    const result = await client.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});