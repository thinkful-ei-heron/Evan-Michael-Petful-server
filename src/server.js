const express = require('express');
const cors = require('cors');
const apiRouter = require('./api-router');
const app = express();
const Queue = require('./queue');
const { CLIENT_ORIGIN, PORT, NODE_ENV } = require('./config');
const { dogArray, catArray, userArray } = require('./PetQueue');
app.use(cors({ origin: CLIENT_ORIGIN }));

let catQueue = new Queue();
let dogQueue = new Queue();
let userQueue = new Queue();

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

//wouldn't want this in production
if (NODE_ENV === 'development' || NODE_ENV === 'demo') {
  //fake other users adopting out pets, and don't remain out of pets for long
  setInterval(() => {
    let peekUser = userQueue.first;
    if (peekUser) peekUser = peekUser.value;
    if (
      peekUser &&
      ['John', 'Paul', 'Ringo', 'George'].includes(peekUser.name)
    ) {
      //if the user up front is one of our demo users
      let user = userQueue.dequeue();
      if (user.cat && catQueue.first !== null) {
        catQueue.dequeue();
      }
      if (user.dog && dogQueue.first !== null) {
        dogQueue.dequeue();
      }
    }

    if (catQueue.first === null) {
      setDemoCats();
    }
    if (dogQueue.first === null) {
      setDemoDogs();
    }
    if (peekUser === null) {
      setDemoUsers();
    }
  }, 10000);
}

function setDemoCats() {
  catArray.map(cat => catQueue.enqueue(cat));
}
function setDemoDogs() {
  dogArray.map(dog => dogQueue.enqueue(dog));
}
function setDemoUsers() {
  userArray.map(user => userQueue.enqueue(user));
}

if (NODE_ENV === 'test') {
  //need to be able to manipulate state for testing
  function clearAll() {
    catQueue = new Queue();
    dogQueue = new Queue();
    userQueue = new Queue();
  }
  function setTestContents() {
    setDemoCats();
    setDemoDogs();
    setDemoUsers();
    app.set('catQueue', catQueue);
    app.set('dogQueue', dogQueue);
    app.set('userQueue', userQueue);
  }

  module.exports = { app, clearAll, setTestContents };
}
