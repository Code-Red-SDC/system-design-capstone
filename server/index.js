const { createServer } = require('./server');

const PORT = process.env.port || 5000;

const app = createServer();

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error in server setup');
  }
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app };
