const router = require('express').Router();

router.use('/address', require('./address/addressRoutes'));
router.use('/user', require('./user/userRoutes'));
router.use('/entity', require('./entity/entityRoutes'));

module.exports = router;
