const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  remember_password: Joi.boolean().optional().allow("", null)
});
module.exports = loginSchema;
