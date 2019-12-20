const express = require('express');
const cors = require('cors');
const apiRouter = require('./api-router');
const app = express();
const Queue = require('./queue');
const { CLIENT_ORIGIN, PORT } = require('./config');
const { dogArray, catArray } = require('./PetQueue');
app.use(cors({ origin: CLIENT_ORIGIN }));

const catQueue = new Queue();
const dogQueue = new Queue();
const userQueue = new Queue();

app.set('catQueue', catQueue);
app.set('dogQueue', dogQueue);
app.set('userQueue', userQueue);
app.set('queues', ['cat', 'dog', 'user']);
app.use('/api', apiRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});

catArray.map(cat => catQueue.enqueue(cat));
dogArray.map(dog => dogQueue.enqueue(dog));
