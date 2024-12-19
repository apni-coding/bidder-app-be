const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const Users = require("./user");

const AuctionCategory = sequelize.define(
  "AuctionCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: Users,
        key: "id",
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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
    tableName: "auction_category",
    paranoid: true, // soft delete
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    hooks: {
      beforeCreate: (info) => {
        info.updated_at = null; // explicity set updated_at to null
      },
    },
  }
);

module.exports = AuctionCategory;
