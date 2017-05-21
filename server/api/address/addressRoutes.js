const router = require('express').Router();
const controller = require('./addressController');

router.route('/:addressHash')
  .get(controller.get);

module.exports = router;
