const Joi = require("joi");

const updateAuctionStatusSchema = Joi.object({
  auctionId: Joi.number().integer().required(),
  status: Joi.string()
    .valid("pending", "active", "completed", "rejected")
    .required(),
  rejectReason: Joi.when("status", {
    is: "rejected",
    then: Joi.string().min(5).required(),
    otherwise: Joi.string().allow(null, "").optional(),
  }),
});

module.exports = updateAuctionStatusSchema;
