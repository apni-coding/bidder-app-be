const { Op } = require("sequelize");
const Auction = require("../../models/auction");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
const Users = require("../../models/user");
const AuctionCategory = require("../../models/auctionCategory");

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

const getActiveAuctions = async (filters) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      sortBy = "asc",
      categoryId,
    } = filters;
    const offset = (page - 1) * limit;
    const currentDate = new Date();

    // Build dynamic filter options
    const whereClause = {
      status: "active",
      end_date: {
        [Op.gt]: currentDate,
      },
    };

    if (minPrice) {
      whereClause.base_price = {
        [Op.gt]: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      whereClause.base_price = {
        ...whereClause.base_price, //[Op.gt]: parseFloat(minPrice)
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    if (categoryId) {
      whereClause.category_id = categoryId;
    }

    const { rows: auctions, count: total } = await Auction.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "item_name",
        "base_price",
        "description",
        "start_date",
        "end_date",
        "images",
        "updated_at",
        "created_at",
      ],
      include: [
        {
          model: Users,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "email", "dob"],
        },
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description", "icon"],
        },
      ],
      limit,
      offset,
      order: [["end_date", sortBy === "asc" ? "ASC" : "DESC"]], // Order by on end date
    });
    return {
      auctions,
      pagination: {
        total, // total record
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAuctionById = async (auctionId) => {
  try {
    const auction = await Auction.findOne({
      where: {
        id: auctionId,
      },
      attributes: [
        "id",
        "item_name",
        "base_price",
        "status",
        "description",
        "start_date",
        "end_date",
        "images",
        "updated_at",
        "created_at",
      ],
      include: [
        {
          model: Users,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "email", "dob"],
        },
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description", "icon"],
        },
      ],
    });
    return auction;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMyAuctions = async (filters) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      sortBy = "desc",
      categoryId,
      status,
      startDate,
      endDate,
      search,
      userId,
    } = filters;
    const offset = (page - 1) * limit;

    // Build dynamic filter options
    const whereClause = {
      created_by: userId,
    };

    // Filter by multiple status
    if (Array.isArray(status) && status.length > 0) {
      whereClause.status = { [Op.in]: status };
    }

    // Filter by multiple categories
    if (Array.isArray(categoryId) && categoryId.length > 0) {
      whereClause.category_id = { [Op.in]: categoryId.map(Number) };
    }

    // Filter by the item search
    if (search) {
      whereClause.item_name = { [Op.like]: `%${search}%` };
    }

    // Filter by start date or end date
    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      whereClause.start_date = { [Op.gte]: start };
      whereClause.end_date = { [Op.lte]: end };
    } else if (startDate && !endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      whereClause.start_date = { [Op.gte]: start };
    } else if (endDate && !startDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      whereClause.end_date = { [Op.lte]: end };
    }

    if (minPrice) {
      whereClause.base_price = {
        [Op.gt]: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      whereClause.base_price = {
        ...whereClause.base_price, //[Op.gt]: parseFloat(minPrice)
        [Op.lte]: parseFloat(maxPrice),
      };
    }
    console.log("@@@@@@ ", whereClause);

    const { rows: auctions, count: total } = await Auction.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "item_name",
        "base_price",
        "description",
        "start_date",
        "end_date",
        "status",
        "images",
        "updated_at",
        "created_at",
      ],
      include: [
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description", "icon"],
        },
      ],
      limit,
      offset,
      order: [["end_date", sortBy === "asc" ? "ASC" : "DESC"]], // Order by on end date
    });
    return {
      auctions,
      pagination: {
        total, // total record
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAuction = async (auctionId, userId) => {
  try {
    // Find the auction by Id and ensure the user is the creator
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

    // Soft delete by setting deleted_by
    auction.deleted_by = userId;
    await auction.save();
    await auction.destroy(); // soft delete
    return auction;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createAuction,
  updateAuction,
  getActiveAuctions,
  getAuctionById,
  getMyAuctions,
  deleteAuction,
};
