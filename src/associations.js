const Auction = require("./models/auction");
const AuctionCategory = require("./models/auctionCategory");
const Bid = require("./models/bid");
const Roles = require("./models/role");
const Users = require("./models/user");

// Role and user (one to many)
Roles.hasMany(Users, { foreignKey: "role_id", as: "users" });
Users.belongsTo(Roles, { foreignKey: "role_id", as: "role" });

// user and auction (one to many)
Users.hasMany(Auction, { foreignKey: "created_by", as: "createdAuctions" });
Auction.belongsTo(Users, { foreignKey: "created_by", as: "creator" });

// auction category and auctions (one to one )
AuctionCategory.hasOne(Auction, { foreignKey: "category_id", as: "auction" });
Auction.belongsTo(AuctionCategory, {
  foreignKey: "category_id",
  as: "category",
});

// Auction and bid (One to many)
Auction.hasMany(Bid, { foreignKey: "auction_id", as: "bids" });
Bid.belongsTo(Auction, { foreignKey: "auction_id", as: "auction" });

// User and bid (One to many)
Users.hasMany(Bid, { foreignKey: "user_id", as: "bids" });
Bid.belongsTo(Users, { foreignKey: "user_id", as: "bidder" });
