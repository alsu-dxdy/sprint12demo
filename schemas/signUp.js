const Joi = require('joi');

module.exports = Joi.object().keys({
 email: Joi.string().email().lowercase().required(),
 password: Joi.string().min(8).required(),
});
