const Joi = require("joi");

const auctionCategorySchema = Joi.object({
  name: Joi.string().min(5).required(),
  description: Joi.string().allow(null, "").optional(),
  icon: Joi.string().required(),
});

module.exports = auctionCategorySchema;
