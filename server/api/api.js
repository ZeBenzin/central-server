const router = require('express').Router();

router.use('/address', require('./address/addressRoutes'));
router.use('/user', require('./user/userRoutes'));

module.exports = router;
