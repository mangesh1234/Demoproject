'use strict';
const restify = require('restify');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'secretKey';
exports.list = (req, res, next) => {
  db.registration
    .findAll()
    .then((result) => {
      console.log(result);
      res.send(result);
      return next();
    }).catch((err) => {
      console.log('err...', err);
      return next();
    });
};
exports.save = (req, res, next) => {
  // res.send('hello');
  console.log('req==', req);
  // db.registration
  //   .create(req.params)
  //   .then((result) => {
  //     console.log(result);
  //     res.send(result);
  //     return next();
  //   }).catch((err) => {
  //     console.log('err...', err);
  //     return next();
  //   });
  // return next();
};

exports.getById = (req, res, next) => {
  db.registration
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then((result) => {
      const token = jwt.sign({
        id: result.id
      }, APP_SECRET, {
        expiresIn: 60 * 5 * 1000
      });
      return res.send({
        token: token,
        user: result
      });
      return next();
    }).catch((err) => {
      console.log('err...', err);
      return next();
    });
};

exports.update = (req, res, next) => {
  console.log(req.params);
  db.registration
    .update(req.params, {
      where: {
        id: req.params.id
      }
    })
    .then((result) => {
      res.send(result);
      console.log(result);
      return next();
    }).catch((err) => {
      console.log('err...', err);
      return next();
    });
};
