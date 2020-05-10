const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const auth = require('../controllers/auth');
const schema = require('../schemas/signUp');
const joi = require('joi');


const validate = (schema) => {
    return (req, res, next) =>{
         joi.validate(req.body, schema)
         .then(()=>next())
         .catch((err)=>{
             next(err)
         })
    }
}

router.use('/auth', require('./auth'));
router.post('/signUp', validate(schema), auth.signUp);
router.post('/signIn', auth.signIn);

router.use('/cards', auth.authenticate, cards);
router.use('/users', users);
router.use('*', (req, res, next)=>{
    next({status: 404, message: 'route not found'})
})

module.exports = router;