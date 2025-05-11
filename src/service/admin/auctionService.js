const Auction = require("../../models/auction");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const updateAuctionStatus = async ({
  auctionId,
  status,
  rejectReason,
  userId,
}) => {
  try {
    const auction = await Auction.findByPk(auctionId);
    if (!auction) {
      throw new Error(ERROR_MESSAGE.AUCTION_NOT_FOUND);
    }
    (auction.status = status),
      (auction.updated_by = userId),
      (auction.rejected_reason = status === "rejected" ? rejectReason : null);
    await auction.save();
    return auction;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { updateAuctionStatus };
