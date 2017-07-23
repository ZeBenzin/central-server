const router = require('express').Router();
const controller = require('./entityController');

router.param('id', controller.params);

router.route('/')
  .post(controller.post);

router.route('/:id')
  .get(controller.get)
  .put(controller.put);

module.exports = router;
