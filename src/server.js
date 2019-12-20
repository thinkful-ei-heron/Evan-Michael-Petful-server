const express = require('express');
const cors = require('cors');
const petRouter = require('./pet-router');
const userRouter = require('./userRouter');
const app = express();
const Queue = require('./queue');
const { CLIENT_ORIGIN, PORT } = require('./config');
app.use(cors({ origin: CLIENT_ORIGIN }));

const catQueue = new Queue();
const dogQueue = new Queue();
const userQueue = new Queue();

app.set('catQueue', catQueue);
app.set('dogQueue', dogQueue);
app.set('userQueue', userQueue);
app.use('/api/users', userRouter);
app.use('/api', petRouter);

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

catQueue.enqueue({
  imageURL:
    'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription:
    'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});
dogQueue.enqueue({
  imageURL:
    'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription:
    'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
});
