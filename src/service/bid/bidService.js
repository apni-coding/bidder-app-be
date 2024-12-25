const { Op } = require("sequelize");
const Auction = require("../../models/auction");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
const Bid = require("../../models/bid");

const saveBid = async (bidInfo) => {
  try {
    const { userId, auction_id, bid_amount } = bidInfo;
    const currentDate = new Date();
    // Fetch auction details
    const auction = await Auction.findOne({
      where: {
        id: auction_id,
        status: "active",
        end_date: {
          [Op.gt]: currentDate,
        },
      },
    });

    if (!auction) {
      throw new Error(ERROR_MESSAGE.AUCTION_NOT_FOUND);
    }

    // Check if the  use is bidding on their own auction
    if (auction.created_by === userId) {
      throw new Error(ERROR_MESSAGE.CANNOT_BID_OWN_AUCTION);
    }

    // bid amount always > base amt
    if (bid_amount < auction.base_price) {
      throw new Error(ERROR_MESSAGE.BID_AMT_LESS);
    }

    // is bid present
    const isBid = await Bid.findOne({
      where: {
        user_id: userId,
        auction_id: auction_id,
      },
    });

    if (isBid) {
      throw new Error(ERROR_MESSAGE.BID_ALREADY_APPLIED);
    }

    // create the bid
    const bid = await Bid.create({
      user_id: userId,
      auction_id,
      bid_amount,
      bid_status: "pending",
      created_by: userId,
    });
    return bid;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { saveBid };
