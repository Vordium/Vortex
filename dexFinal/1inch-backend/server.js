const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (e.g., your client-side files)
app.use(express.static(path.join(__dirname, 'public')));

// Define custom routes or additional server logic here

// Route for handling requests to /api/1inch
app.use('/api', require('./api/1inch.js'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
