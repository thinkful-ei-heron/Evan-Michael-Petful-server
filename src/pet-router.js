const express = require('express');

const petRouter = express.Router();

petRouter
  .route('/cat')
  .get((req, res) => {
    const cats = req.app.get('catQueue');
    if (cats.first === null) {
      return res.status(404).json({ error: 'No cats found' });
    }
    res.json(cats.first.value);
  })
  .delete((req, res) => {
    const cats = req.app.get('catQueue');
    cats.dequeue();
    res.status(204).send();
  });
petRouter
  .route('/dog')
  .get((req, res) => {
    const dogs = req.app.get('dogQueue');
    if (dogs.first === null) {
      return res.status(404).json({ error: 'No dogs found' });
    }
    res.json(dogs.first.value);
  })
  .delete((req, res) => {
    const dogs = req.app.get('dogQueue');
    dogs.dequeue();
    res.status(204).send();
  });

module.exports = petRouter;
