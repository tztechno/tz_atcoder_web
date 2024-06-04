const express = require('express');
const app = express();
const port = 3000; // Replace with your preferred port

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});