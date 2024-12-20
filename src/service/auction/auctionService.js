const Auction = require("../../models/auction");

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

module.exports = {
  createAuction,
};
