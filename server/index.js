const { createServer } = require('./server');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = createServer();

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error in server setup');
  }
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app };
