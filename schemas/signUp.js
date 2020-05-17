const {Joi} = require('celebrate');

module.exports = {
    body: Joi.object().keys({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).required(),
    })
}
