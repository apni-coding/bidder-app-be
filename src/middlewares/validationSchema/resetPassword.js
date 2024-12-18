const Joi = require("joi");

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
});
module.exports = resetPasswordSchema;
