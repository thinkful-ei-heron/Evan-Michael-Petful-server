const express = require('express');
const xss = require('xss');
const eq = require('shallow-equal');
const bodyParser = express.json();
const petRouter = express.Router();

petRouter
  .route('/cat')
  .get((req, res) => {
    sendNextPet('cat', req, res);
  })
  .post(bodyParser, (req, res) => {
    addPet('cat', req, res);
  })
  .delete((req, res) => {
    const cats = req.app.get('catQueue');
    cats.dequeue();
    res.status(204).send();
  });
petRouter
  .route('/dog')
  .get((req, res) => {
    sendNextPet('dog', req, res);
  })
  .post(bodyParser, (req, res) => {
    addPet('dog', req.body);
  })
  .delete((req, res) => {
    const dogs = req.app.get('dogQueue');
    dogs.dequeue();
    res.status(204).send();
  });

function sanitize(obj) {
  for (let key of Object.keys(obj)) {
    obj[key] = xss(obj[key]);
  }
  //objects are mutated so no need to return
}

function sendNextPet(type, req, res) {
  const queue = req.app.get(`${type}Queue`);
  if (queue.first === null) {
    return res.status(404).json({ error: `No ${type}s found` });
  }
  const pet = queue.first.value;
  sanitize(pet);
  res.json(pet);
}

function addPet(type, req, res) {
  const { imageURL, imageDescription, name, sex, age, breed, story } = req.body;
  const queue = req.app.get(`${type}Queue`);
  const newPet = { imageURL, imageDescription, name, sex, age, breed, story };
  sanitize(newPet);
  queue.enqueue(newPet);
}

function sendAllPets(type, req, res) {
  const queue = req.app.get(`${type}Queue`);
  if (queue.first === null) {
    return [];
  }

  let pets = [];
  const firstPet = queue.first.value;

  const lastPet = queue.last.value;
  let pet = null;
  //loop through entire queue, pushing each pet into array of pets and then returning it to the queue
  //when we see the last pet in the loop comparison, the queue is back to its old state and we have every pet in our array
  while (!eq(pet, lastPet)) {
    pet = queue.dequeue();
    pets.push(pet);
    queue.enqueue(pet);
  }
  res.json(pets);
}

module.exports = petRouter;
