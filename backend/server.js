/** @format */

// Server that allows the backend to run
const app = require('./app');
const PORT = process.env.PORT || 8000;

// Listening for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
