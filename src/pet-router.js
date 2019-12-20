const express = require('express');
const PetService = require('./petService');
const bodyParser = express.json();
const petRouter = express.Router();

petRouter
  .route('/cat')
  .get((req, res) => {
    const cat = PetService.getNextPet('cat', req);
    PetService.sendResponse('cat', cat, res);
  })
  .post(bodyParser, (req, res) => {
    const cat = addPet('cat', req);
    PetService.sendResponse('cat', cat, res);
  })
  .delete((req, res) => {
    const removed = PetService.remove('cat', req);
    PetService.sendResponse('cat', removed, res);
  });
petRouter.route('/cat/all').get((req, res) => {
  const cats = PetService.getAllPets('cat', req, res);
  PetService.sendResponse('cat', cats, res);
});
petRouter
  .route('/dog')
  .get((req, res) => {
    const dog = PetService.getNextPet('dog', req);
    PetService.sendResponse('dog', dog, res);
  })
  .post(bodyParser, (req, res) => {
    const dog = addPet('dog', req);
    PetService.sendResponse('dog', dog, res);
  })
  .delete((req, res) => {
    const removed = PetService.remove('dog', req);
    PetService.sendResponse('dog', removed, res);
  });
petRouter.route('/dog/all').get((req, res) => {
  const dogs = PetService.getAllPets('dog', req, res);
  PetService.sendResponse('dog', dogs, res);
});

module.exports = petRouter;
