const { Op } = require("sequelize");
const Users = require("../../models/user");
const { ROLE_ID } = require("../../utils/propertyResolver");

const getUserList = async (filters, role_id) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role_ids = [],
      is_active = [],
    } = filters;

    const offset = (page - 1) * limit;

    const whereClause = {};

    // Restrict ADMIN role to only view users
    if (role_id === ROLE_ID.ADMIN) {
      whereClause.role_id = ROLE_ID.USER;
    }

    // Search by first_name, last_name, or email
    if (search) {
      whereClause[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (role_ids.length > 0 && !whereClause.role_id) {
      whereClause.role_id = {
        [Op.in]: roleIdsArray,
      };
    }

    // Multi-select is_active filter
    if (is_active.length) {
      whereClause.is_active = {
        [Op.in]: is_active,
      };
    }

    const { rows, count: total } = await Users.findAndCountAll({
      where: whereClause,
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "role_id",
        "is_active",
        "dob",
        "created_by",
        "updated_at",
        "created_at",
      ],
      limit,
      offset,
    });

    return {
      rows,
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

module.exports = { getUserList };
