const Auction = require("./models/auction");
const AuctionCategory = require("./models/auctionCategory");
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
