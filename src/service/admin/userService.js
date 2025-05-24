const Users = require("../../models/user");
const { ROLE_ID } = require("../../utils/propertyResolver");

const getUserList = async (filters, role_id) => {
  try {
    const { page = 1, limit = 10 } = filters;
    //Offset
    const offset = (page - 1) * limit;

    const whereClause = {};
    
    if (role_id === ROLE_ID.ADMIN) {
      whereClause.role_id = ROLE_ID.USER;
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

module.exports = { getUserList };
