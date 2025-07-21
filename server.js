const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the shopify-app-deployment directory
app.use(express.static('shopify-app-deployment'));

// Serve the main app file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'shopify-app-deployment', 'shopify-app-deployment.html'));
});

// Serve the admin interface
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'shopify-app-deployment', 'shopify-admin-interface.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Volume Pricing Tool server running on port ${PORT}`);
  console.log(`Main app: http://localhost:${PORT}/shopify-app-deployment.html`);
  console.log(`Admin interface: http://localhost:${PORT}/admin`);
}); 