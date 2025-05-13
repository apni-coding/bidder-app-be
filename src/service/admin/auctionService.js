const { fn, col, literal } = require("sequelize");
const Auction = require("../../models/auction");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");
const AuctionCategory = require("../../models/auctionCategory");
const Bid = require("../../models/bid");
const Users = require("../../models/user");

const updateAuctionStatus = async ({
  auctionId,
  status,
  rejectReason,
  userId,
}) => {
  try {
    const auction = await Auction.findByPk(auctionId);
    if (!auction) {
      throw new Error(ERROR_MESSAGE.AUCTION_NOT_FOUND);
    }
    (auction.status = status),
      (auction.updated_by = userId),
      (auction.rejected_reason = status === "rejected" ? rejectReason : null);
    await auction.save();
    return auction;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAuctionList = async (filters) => {
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
    } = filters;
    const offset = (page - 1) * limit;

    // Build dynamic filter options
    const whereClause = {};

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
        ...whereClause.base_price,
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    // Step 1: Count without group
    const total = await Auction.count({
      where: whereClause,
      distinct: true,
      col: "Auction.id",
    });

    // Step 2: Fetch data with group
    const auctions = await Auction.findAll({
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
        [fn("COUNT", col("bids.id")), "totalBids"],
      ],
      include: [
        {
          model: AuctionCategory,
          as: "category",
          attributes: ["id", "name", "description", "icon"],
        },
        {
          model: Users,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "email", "dob"],
        },
        {
          model: Bid,
          as: "bids",
          attributes: [],
          required: false,
        },
      ],
      group: ["Auction.id", "category.id"],
      limit,
      offset,
      order: [["created_at", sortBy === "asc" ? "ASC" : "DESC"]],
      subQuery: false,
    });

    return {
      auctions,
      pagination: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { updateAuctionStatus, getAuctionList };
