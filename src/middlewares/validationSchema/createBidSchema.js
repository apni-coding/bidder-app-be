const Joi = require("joi");

const createBidSchema = Joi.object({
  auction_id: Joi.number().integer().required(),
  bid_amount: Joi.number().positive().required()
});

module.exports = createBidSchema;


