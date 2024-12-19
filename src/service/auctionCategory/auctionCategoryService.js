const AuctionCategory = require("../../models/auctionCategory");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const saveAuctionCategory = async (auctionDetails) => {
  try {
    const { name } = auctionDetails;
    // find auction category
    const isAuctionCategoryPresent = await AuctionCategory.findOne({
      where: {
        name: name,
      },
    });

    if (isAuctionCategoryPresent) {
      throw new Error(ERROR_MESSAGE.AUCTION_CATEGORY_EXIST);
    }

    // save auction category in db
    const auctionCategoryDetails = await AuctionCategory.create({
      ...auctionDetails,
      created_by: 1, // need to change
    });
    return auctionCategoryDetails;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllAuctionCategory = async()=>{
  try {
    const auctionCategoryList = await AuctionCategory.findAll();
    return auctionCategoryList;
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { saveAuctionCategory, getAllAuctionCategory };
