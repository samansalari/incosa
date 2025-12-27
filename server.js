const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

app.set('trust proxy', true);

app.use(express.static(distPath, {
  extensions: ['html'],
  maxAge: '1h'
}));

const sendHtml = (file) => (req, res) => {
  res.sendFile(path.join(distPath, file));
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', sendHtml('index.html'));
app.get('/observatory', sendHtml('observatory.html'));
app.get('/expedition', sendHtml('expedition.html'));
app.get('/traces', sendHtml('traces.html'));
app.get('/contact', sendHtml('contact.html'));

app.use((req, res) => {
  res.status(404).sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
