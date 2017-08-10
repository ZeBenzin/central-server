const router = require('express').Router();
const controller = require('./entityController');

router.param('id', controller.params);

router.route('/')
  .post(controller.post);

router.route('/:id')
  .get(controller.get)
  .put(controller.put);

router.route('/:id/signatures')
  .get(controller.getSignatures);

router.route('/suggest')
  .post(controller.suggestEntities);

module.exports = router;
