const pool = require('./db');

pool.on('error', (err) => {
  console.error(err.stack);
});

module.exports = {

};
