const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Users = require("./user");
const AuctionCategory = require("./auctionCategory");

const Auction = sequelize.define(
  "Auction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    base_price: {
      type: DataTypes.FLOAT, // Assuming base_price is a decimal value
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "completed", "rejected"),
      defaultValue: "pending",
    },
    rejected_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: AuctionCategory,
        key: "id",
      },
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON, // Storing multiple images as JSON array
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
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
  },
  {
    tableName: "auctions",
    paranoid: true, // Soft delete
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    hooks: {
      beforeCreate: (auction) => {
        auction.updated_at = null; // Explicitly set updated_at to null before creation
      },
    },
  }
);

module.exports = Auction;
