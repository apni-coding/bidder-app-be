const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Users = require("./user");
const Auction = require("./auction");

const Bid = sequelize.define(
  "Bid",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      allowNull: false,
    },
    auction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Auction,
        key: "id",
      },
      allowNull: false,
    },
    bid_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bid_status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Users,
        key: "id",
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Users,
        key: "id",
      },
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true, // Allow updated_at to be null
      defaultValue: null, // Set default to null
    },
  },
  {
    tableName: "bids",
    paranoid: true, // Soft delete
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    hooks: {
      beforeCreate: (bid) => {
        bid.updated_at = null; // Explicitly set updated_at to null before creation
      },
    },
  }
);

module.exports = Bid;
