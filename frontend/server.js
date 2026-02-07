const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Frontend running on http://localhost:${port}`);
});
