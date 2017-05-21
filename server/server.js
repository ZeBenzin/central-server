const express = require('express');
const app = express();
const api = require('./api/api');
const auth = require('./auth/routes');
const config = require('./config/config');

require('mongoose').connect(config.db.url);
require('./middleware/middleware')(app);

app.use('/api', api);
app.use('/auth', auth);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
});

module.exports = app;
