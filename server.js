import express from 'express';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve the Vite build output
app.use(express.static('dist'));

// Also serve static files from the public directory
app.use('/public', express.static('public'));

// API endpoint to get image files
app.get('/api/images', async (req, res) => {
  try {
    const files = await readdir(join(__dirname, 'public/images'));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error reading directory' });
  }
});

// Handle client-side routing by serving index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes or public files
  if (!req.path.startsWith('/api/') && !req.path.startsWith('/public/')) {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});