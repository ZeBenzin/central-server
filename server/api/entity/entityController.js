const _ = require('lodash');
const Entity = require('./entityModel');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

exports.params = (req, res, next, id) => {
  Entity.findById(id)
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
  res.status(200).send(req.entity);
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
  const entity = req.entity;
  const updatedEntity = req.body;
  _.merge(entity, updatedEntity);
  entity.markModified('resolvedAddresses');
  entity.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(saved);
    }
  });
};

exports.suggestEntities = (req, res, next) => {
  const searchedText = req.body.name;
  Entity.find({'name': {'$regex': searchedText, '$options': 'i'}})
    .then(entities => {
      res.status(200).json(entities);
    })
    .catch(err => next(err));
};

exports.getSignatures = (req, res, next) => {
  const { signatures } = req.entity;
  const convertedSignatures = _.map(signatures, sig => mongoose.Types.ObjectId(sig));
  Entity.find({
    '_id': {
      $in: convertedSignatures
    }
  })
  .then(entities => {
    const responsePayload = {
      entities,
      signedEntity: req.entity
    };
    res.status(200).json(responsePayload);
  })
  .catch(err => next(err));
};
