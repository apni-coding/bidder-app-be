const Joi = require("joi");

const createAuctionSchema = Joi.object({
  item_name: Joi.string().max(255).required(),
  base_price: Joi.number().greater(0).required(),
  description: Joi.string().required(),
  start_date: Joi.date().iso().required(), //joi.date().iso() accepts both YYYY-MM-DDThh:mm:ss.sssZ and  YYYY-MM-DD hh:mm:ss.sssZ
  end_date: Joi.date().iso().greater(Joi.ref("start_date")).required(),
  category_id: Joi.number().integer().required(),
  images: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = createAuctionSchema;


