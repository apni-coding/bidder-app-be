const Auction = require("../models/auction");
const AuctionCategory = require("../models/auctionCategory");
const Bid = require("../models/bid");
const Roles = require("../models/role");
const Users = require("../models/user");

const tableSync = async () => {
  try {
    await Roles.sync({ force: false });
    await Users.sync({ force: false });
    await AuctionCategory.sync({ force: false });
    await Auction.sync({ force: false });
    await Bid.sync({ force: false });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };
