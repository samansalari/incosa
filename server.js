const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:irmMpsfQdvYRTuqegZJpfDUTkGUTUJnH@turntable.proxy.rlwy.net:45203/railway',
  ssl: { rejectUnauthorized: false },
});

client.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to database');
  }
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint example
app.get('/api/test', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch all handler: send back index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});