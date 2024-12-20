const Auction = require("../../models/auction");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const createAuction = async (auctionData, userId) => {
  try {
    const auctionDetail = await Auction.create({
      ...auctionData,
      created_by: userId,
    });
    return auctionDetail;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAuction = async (auctionId, userId, auctionData) => {
  try {
    // Find the auction by ID and ensure the user is the creator
    const auction = await Auction.findOne({
      where: {
        id: auctionId,
        created_by: userId,
      },
    });

    // Auction not found
    if (!auction) {
      throw new Error(ERROR_MESSAGE.AUCTION_NOT_FOUND);
    }

    // Update auction filed and reset status to 'pending'
    await auction.update({
      ...auctionData,
      status: "pending",
      updated_by: userId,
    });

    return auction;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAuction,
  updateAuction,
};
