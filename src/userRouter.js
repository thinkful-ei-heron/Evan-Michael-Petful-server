const express = require('express');
const xss = require('xss');
const eq = require('shallow-equal').shallowEqualObjects;
const bodyParser = express.json();
const userRouter = express.Router();

userRouter.route('/').get((req, res) => {
  res.send('success');
});

module.exports = userRouter;
