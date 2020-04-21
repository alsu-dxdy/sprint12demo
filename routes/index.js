const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');

router.use('/cards', cards);
router.use('/users', users);
router.use('*', (req, res, next)=>{
    next({status: 404, message: 'route not found'})
})

module.exports = router;