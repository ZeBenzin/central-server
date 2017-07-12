const Entity = require('./entityModel');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

exports.params = (req, res, next, id) => {
  Entity.findOne()
    .then(entity => {
      if (!entity) {
        res.status(404).send(`No entity with ID ${id}`);
      } else {
        req.entity = entity;
        next();
      }
    })
    .catch(err => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  res.status(200).send('Entity endpoint reached!');
};

exports.post = (req, res, next) => {
  const entity = req.body;
  Entity.create(entity)
    .then(entity => {
      res.status(201).json(entity);
    })
    .catch(err => next(err));
};

exports.put = (req, res, next) => {

};
