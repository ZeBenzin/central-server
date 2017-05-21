const router = require('express').Router();
const controller = require('./userController');

router.param('id', controller.params);

router.route('/')
  .post(controller.post);

router.route('/:id')
  .delete(controller.delete);

module.exports = router;
