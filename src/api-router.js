const express = require('express');
const ApiService = require('./apiService');
const bodyParser = express.json();
const apiRouter = express.Router();

apiRouter
  .route('/:type')
  .get((req, res) => {
    const type = req.params.type;
    if (!ApiService.validateType(type, req, res)) {
      return;
    }
    const next = ApiService.getNext(type, req);
    ApiService.sendResponse(type, next, res);
  })
  .post(bodyParser, (req, res) => {
    const type = req.params.type;
    if (!ApiService.validateType(type, req, res)) {
      return;
    }
    const added = add(type, req);
    ApiService.sendResponse(type, added, res);
  })
  .delete((req, res) => {
    const type = req.params.type;
    if (!ApiService.validateType(type, req, res)) {
      return;
    }
    const removed = ApiService.remove(type, req);
    ApiService.sendResponse(type, removed, res);
    if(!removed) {
      const restart = req.app.get('restart');
      restart();
    }
  });
apiRouter.route('/:type/all').get((req, res) => {
  const type = req.params.type;
  if (!ApiService.validateType(type, req, res)) {
    return;
  }
  const all = ApiService.getAll(type, req, res);
  ApiService.sendResponse(type, all, res);
});

module.exports = apiRouter;
