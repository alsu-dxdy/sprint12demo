const router = require('express').Router();
const {celebrate} = require('celebrate');
const users = require('./users');
const cards = require('./cards');
const auth = require('../controllers/auth');
const schema = require('../schemas/signUp');

router.use('/auth', require('./auth'));
router.post('/signUp', celebrate(schema), auth.signUp);
router.post('/signIn', auth.signIn);

router.use('/cards', auth.authenticate, cards);
router.use('/users', users);
router.use('*', (req, res, next)=>{
    next({status: 404, message: 'route not found'})
})

module.exports = router;