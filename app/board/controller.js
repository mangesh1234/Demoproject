'use strict';
const restify = require('restify');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'asasasa';
exports.list = (req,res, next) => {
   db.registration
    .findAll()
    .then((result) => {
      const token = jwt.sign({
          id: 1
        }, APP_SECRET, {
          expiresIn: 60 * 5 * 1000
        });

        return res.send({
          token: token
        });
   console.log('result', JSON.stringify(token));
    return next();
  }).catch((err) => {
    console.log('err...', err);
    return next();
  });
};
exports.save = (req,res, next) => {
  console.log('req==', req.params);
   db.registration
    .create(req.params)
    .then((result) => {
     res.send();
   console.log(result);
    return next();
  }).catch((err) => {
    console.log('err...', err);
    return next();
  });
};